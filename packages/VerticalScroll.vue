<template>
  <div class="vue3-seamless-vertical-wrapper" ref="realWrapperRef"
    :style="{ transition: `transform ${ease}`, transform: `translateY(-${offset}px)` }">
    <template v-for="item in visibleItems" :key="item.id">
      <slot :data="item.data" :index="item.index"> </slot>
    </template>
  </div>
  <div style="position: absolute !important; top: -999999px !important;" ref="realWrapperHiddenRef">
    <template v-for="item in testList" :key="item.id">
      <slot :data="item.data" :index="item.index"> </slot>
    </template>
  </div>
</template>

<script>
import {
  computed, defineComponent, onMounted, ref,
  onUnmounted, nextTick
} from 'vue';

import { throttle, listMap, duplicateId, uuid } from './util';

export default defineComponent({
  name: 'VerticalScroll',
  props: {
    // 是否开启自动滚动
    modelValue: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      required: true,
    },
    // 是否开启鼠标悬停
    hover: {
      type: Boolean,
      default: false,
    },
    // 单步停止等待时间 (默认值 1000ms)
    singleWaitTime: {
      type: Number,
      default: 1000,
    },
    // 开启鼠标悬停时支持滚轮滚动
    wheel: {
      type: Boolean,
      default: false,
    },
    // 启用单行滚动
    singleLine: {
      type: Boolean,
      default: false,
    },
    step: {
      type: Number,
      default: 0.5,
    },
    visibleCount: {
      type: Number,
    },
    ease: {
      type: String,
      default: 'cubic-bezier(0.03, 0.76, 1, 0.16)'
    },
    direction: {
      type: String,
      default: 'up',
    },
    delay: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { expose, emit }) {
    /**
    * @type {import('vue').Ref<HTMLDivElement>}
    */
    const realWrapperRef = ref(null);
    /**
    * @type {import('vue').Ref<HTMLDivElement>}
    */
    const realWrapperHiddenRef = ref(null);

    const funArgs = ref([]);

    const offset = ref(0);

    const isHover = ref(false);

    const direction = ref(props.direction);

    const isScroll = computed(() => props.hover ? !isHover.value && props.modelValue : props.modelValue);

    const testList = ref([]);

    const targetList = listMap(props.list);

    const visibleCount = ref(props.visibleCount === (void 0) ? 0 : props.visibleCount);

    let childrenHeightList = [];

    let bufferTotalHeight = 0;

    let bufferSize = 0;

    let cursorIndex = -1;

    let realBoxHeight = 0;

    let reqFrame = null;

    let singleState = false;

    let singleOffset = 0;

    let tempOffset = 0;

    let listCanScroll = false;

    const cancle = () => {
      cancelAnimationFrame(reqFrame);
      reqFrame = null;
    }

    const updateCursorIndex = () => {
      const totalIndex = cursorIndex + bufferSize;
      if (totalIndex >= targetList.length) {
        const tempIndex = totalIndex - targetList.length;
        const tempFuns = ['splice',
          [0, bufferSize],
          [cursorIndex],
          [0, tempIndex]];
        funArgs.value = tempFuns;
        if (tempIndex > targetList.length) {
          cursorIndex = targetList.length;
        } else {
          cursorIndex = tempIndex;
        }
      } else {
        const tempFuns = ['splice', [0, bufferSize], [cursorIndex, totalIndex]];
        funArgs.value = tempFuns;
        cursorIndex = totalIndex;
      }
    }

    const initHeight = () => {
      const children = Array.from(realWrapperRef.value.children);
      const subChildren = direction.value === 'up' ?
        children.slice(0, bufferSize) :
        children.slice(visibleItems.value.length - bufferSize, visibleItems.value.length);
      childrenHeightList = subChildren.map((c) => c.offsetHeight);
      bufferTotalHeight = childrenHeightList
        .reduce((a, b) => a + b, 0);
    }

    const animation = (isWheel, step) => {
      cancle();
      if (!listCanScroll) {
        return;
      }

      const scrollFun = () => {
        if (props.singleLine && singleOffset >= childrenHeightList[0]) {
          singleState = true;
          childrenHeightList.shift();
          singleOffset = 0;
          setTimeout(() => {
            singleState = false;
            if (!isWheel) {
              animation(false, props.step);
            }
          }, props.singleWaitTime);
        } else {
          if (!isWheel) {
            animation(false, props.step);
          }
        }
      }
      if (isScroll.value && !singleState || isWheel) {
        reqFrame = requestAnimationFrame(() => {
          tempOffset += step;
          singleOffset += step;
          if (direction.value === 'up') {
            offset.value += step;
          } else {
            offset.value -= step;
          }
          if (tempOffset > bufferTotalHeight) {
            emit('offset');
            updateCursorIndex();
            nextTick(() => {
              offset.value = direction.value === 'up' ? 0 : getFullHeight() - realBoxHeight;
              tempOffset = 0;
              initHeight();
              scrollFun();
            })
          } else {
            scrollFun();
          }
        });
      }
    }

    const onMouseenter = () => {
      isHover.value = true;
    }

    const onMouseleave = () => {
      isHover.value = false;
      if (props.hover) {
        animation(false, props.step);
      }
    }

    const throttleFunc = throttle(30, (e) => {
      animation(true, 10);
    });

    const onWheel = (e) => {
      if (props.hover && props.wheel) {
        throttleFunc(e);
        e.preventDefault();
        e.stopPropagation();
      }
    };

    /**
     * @type {import('vue').ComputedRef<Array<any>>}
     */
    const visibleItems = computed(() => {
      let tempList = [];
      if (funArgs.value.length === 0) {
        tempList = targetList.slice(0, visibleCount.value);
      } else if (funArgs.value[0] === 'splice') {
        tempList = direction.value === 'up' ? visibleItems.value : visibleItems.value.reverse();
        tempList.splice(...funArgs.value[1]);
        funArgs.value.slice(2).forEach(args => {
          tempList.push(...targetList.slice(...args));
        });
      } else {
        funArgs.value.slice(1).forEach(args => {
          tempList.push(...targetList.slice(...args));
        });
      }
      if (!(direction.value === 'up')) {
        tempList.reverse();
      }
      console.log('VerticalScroll---', 'bufferSize', bufferSize, 'visibleCount', visibleCount.value, 'funArgs', JSON.stringify(funArgs.value), 'tempList', tempList);
      return duplicateId(tempList);
    });

    const initCursorIndex = () => {
      cursorIndex = visibleCount.value + bufferSize;
      if (cursorIndex >= targetList.length) {
        const tempIndex = cursorIndex - targetList.length;
        const tempFunArgs = ['slice', [0, cursorIndex], [0, tempIndex]];
        if (tempIndex > targetList.length) {
          cursorIndex = targetList.length;
        } else {
          cursorIndex = tempIndex;
        }
        return tempFunArgs;
      } else {
        return ['slice', [0, cursorIndex]];
      }
    }


    const getFullHeight = () => {
      return Array.from(realWrapperRef.value.children)
        .map((c) => c.offsetHeight).reduce((a, b) => a + b, 0);
    }

    const initVisibleCount = (cb) => {
      if (props.visibleCount === (void 0)) {
        testList.value = listMap([props.list[0]]);
        nextTick(() => {
          visibleCount.value = Math.ceil(realBoxHeight / realWrapperHiddenRef.value.offsetHeight) + 2;
          testList.value = targetList.slice(0, visibleCount.value);
          nextTick(() => {
            cb();
          })
        })
      } else {
        testList.value = targetList.slice(0, visibleCount.value);
        nextTick(() => {
          cb();
        })
      }
    }

    onMounted(() => {
      if (!!realWrapperRef.value) {
        realWrapperRef.value.parentElement.addEventListener('mouseenter', onMouseenter);
        realWrapperRef.value.parentElement.addEventListener('mouseleave', onMouseleave);
        realWrapperRef.value.parentElement.addEventListener('wheel', onWheel);
        realBoxHeight = realWrapperRef.value.parentElement.offsetHeight;

        if (props.list.length > 0) {
          initVisibleCount(() => {
            const hasVerticalScroll = realWrapperHiddenRef.value.offsetHeight > realBoxHeight;
            if (hasVerticalScroll) {
              bufferSize = getBufferSize();

              funArgs.value = initCursorIndex();
              nextTick(() => {
                offset.value = direction.value === 'up' ? 0 : getFullHeight() - realBoxHeight;

                initHeight();
                listCanScroll = true;
                setTimeout(() => {
                  animation(false, props.step);
                }, props.delay);
              })
            } else {
              init();
            }
            testList.value = [];
          });
        }
      }
    });

    const init = () => {
      listCanScroll = false;
      bufferSize = 0;
      funArgs.value = [];
      nextTick(() => {
        offset.value = direction.value === 'up' ? 0 : getFullHeight() - realBoxHeight;
        tempOffset = 0;
        singleOffset = 0;
      });
    }

    const getBufferSize = () => {
      let tempBufferSize = targetList.length - visibleCount.value;
      tempBufferSize = Math.max(1, tempBufferSize);
      tempBufferSize = Math.min(10, tempBufferSize);
      return tempBufferSize;
    }

    const add = (index, values, cb) => {
      if (!!values && values.length > 0) {
        if (index > targetList.length) {
          index = targetList.length;
        }
        if (index < 0) {
          index = 0;
        }
        const findIndexs = [];
        if (values.length === 1) {
          visibleItems.value.forEach((v, i) => {
            if (v.index === index) {
              findIndexs.push(i);
            }
          });
        }
        const datas = [];
        values.forEach((v) => {
          datas.push({
            id: uuid(),
            data: v
          });
        })

        targetList.splice(index, 0, ...datas);
        targetList.forEach((v, i) => {
          v.index = i;
        });

        const tempBufferSize = getBufferSize();

        if (listCanScroll) {
          if (index < cursorIndex) {
            cursorIndex += 1;
            if (cursorIndex > targetList.length) {
              cursorIndex = 0;
            }
          }

          if (values.length === 1 && findIndexs.length > 0) {
            findIndexs.forEach((i) => {
              visibleItems.value[i] = datas[0];
            })
          }
          if (tempBufferSize !== bufferSize) {
            bufferSize = tempBufferSize;
          }
        } else {
          const fun = () => {
            const hasVerticalScroll = realWrapperHiddenRef.value.offsetHeight > realBoxHeight;
            if (hasVerticalScroll) {
              bufferSize = tempBufferSize;
              funArgs.value = initCursorIndex();
              nextTick(() => {
                offset.value = direction.value === 'up' ? 0 : getFullHeight() - realBoxHeight;
                tempOffset = 0;
                singleOffset = 0;

                initHeight();
                listCanScroll = true;
                animation(false, props.step);
              });
            } else {
              if (props.visibleCount === (void 0)) {
                visibleCount.value = 0;
              }
              init();
            }
            testList.value = [];
          }
          if (visibleCount.value === 0 && props.visibleCount === (void 0)) {
            initVisibleCount(() => {
              fun();
            });
          } else {
            testList.value = targetList.slice(0, visibleCount.value);
            nextTick(() => {
              fun();
            })
          }
        }
      }
      if (!!cb && typeof cb === 'function') {
        cb(targetList);
      }
    }

    const remove = (index, num = 1, cb) => {
      if (index >= 0 && index < targetList.length) {
        targetList.splice(index, num);
        if (listCanScroll) {
          testList.value = targetList.slice(0, visibleCount.value);
          nextTick(() => {
            const hasVerticalScroll = realWrapperHiddenRef.value.offsetHeight > realBoxHeight;
            if (hasVerticalScroll) {
              const tempBufferSize = getBufferSize();

              if (tempBufferSize !== bufferSize) {
                bufferSize = tempBufferSize;
              }
              const findIndexs = [];
              visibleItems.value.forEach((v, i) => {
                if (v.index === index) {
                  findIndexs.push(i);
                }
              });
              if (findIndexs.length > 0) {
                if (funArgs.value[0] === 'splice') {
                  updateCursorIndex();
                  nextTick(() => {
                    initHeight();
                  });
                } else {
                  funArgs.value = initCursorIndex();
                  nextTick(() => {
                    initHeight();
                  });
                }
              }
            } else {
              init();
            }
            testList.value = [];
          })
        } else {
          init();
        }
      }
      if (!!cb && typeof cb === 'function') {
        cb(targetList);
      }
    }


    const reset = () => {
      nextTick(() => {
        testList.value = targetList.slice(0, visibleCount.value);
        nextTick(() => {
          const hasVerticalScroll = realWrapperHiddenRef.value.offsetHeight > realBoxHeight;
          if (hasVerticalScroll) {
            if (funArgs.value[0] === 'splice') {
              updateCursorIndex();
              nextTick(() => {
                initHeight();
              });
            } else {
              funArgs.value = initCursorIndex();
              nextTick(() => {
                initHeight();
              });
            }
          } else {
            init();
          }
        });
      })
    }


    const update = (index, value, cb) => {
      if (index >= 0 && index < targetList.length) {
        const findIndexs = [];
        visibleItems.value.forEach((v, i) => {
          if (v.index === index) {
            findIndexs.push(i);
          }
        });
        const data = {
          id: uuid(),
          index: index,
          data: value
        };
        targetList[index] = data;
        if (findIndexs.length > 0) {
          findIndexs.forEach((i) => {
            visibleItems.value[i] = data;
          })
        }
      }
      if (!!cb && typeof cb === 'function') {
        cb(targetList);
      }
    }

    expose({ add, remove, update, reset });

    onUnmounted(() => {
      cancelAnimationFrame(reqFrame);
      if (realWrapperRef.value) {
        realWrapperRef.value.parentElement.removeEventListener('mouseenter', onMouseenter);
        realWrapperRef.value.parentElement.removeEventListener('mouseleave', onMouseleave);
        realWrapperRef.value.parentElement.removeEventListener('wheel', onWheel);
      }
    });

    return {
      realWrapperRef,
      visibleItems,
      offset,
      testList,
      realWrapperHiddenRef
    }
  }
});
</script>

<style scoped>
.vue3-seamless-vertical-wrapper {
  width: 100%;
}
</style>
