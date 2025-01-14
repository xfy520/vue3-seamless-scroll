<template>
  <div class="vue3-seamless-wrapper" ref="realWrapperRef"
    :style="{ transition: `transform ${ease}`, transform: transform }" v-bind="$attrs">
    <template v-for="item in visibleItems" :key="item.id">
      <slot :data="item.data" :index="item.index"> </slot>
    </template>
  </div>
  <div style="position: absolute !important; left: -999999px !important;" ref="realWrapperHiddenRef" v-bind="$attrs">
    <template v-for="item in testList" :key="item.id">
      <slot :data="item.data" :index="item.index"> </slot>
    </template>
  </div>
</template>

<script>
import {
  computed, defineComponent, onMounted, ref,
  onUnmounted, nextTick, watch
} from 'vue';

import { throttle, listMap, duplicateId, uuid } from './util';

export default defineComponent({
  name: 'Vue3SeamlessScroll',
  emits: ['offset', 'count'],
  inheritAttrs: false,
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
    // up，down，left，right
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
    const realBoxRef = ref(null);
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

    const visibleCount = ref(props.visibleCount === (void 0) ? 0 : props.visibleCount);

    const targetList = listMap(props.list);

    let total = 0;

    let count = 0;

    let totalCount = 0;

    let childrenWHList = [];

    let bufferTotalWH = 0;

    let bufferSize = 0;

    let cursorIndex = -1;

    let realBoxWH = 0;

    let reqFrame = null;

    let singleState = false;

    let singleOffset = 0;

    let tempOffset = 0;

    let listCanScroll = false;

    const transform = computed(() => {
      if (direction.value === 'up' || direction.value === 'down') {
        return `translateY(-${offset.value}px)`;
      }
      return `translateX(-${offset.value}px)`;
    })

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

    const initWH = () => {
      const children = Array.from(realWrapperRef.value.children);
      const subChildren = (direction.value === 'up' || direction.value === 'left') ?
        children.slice(0, bufferSize) :
        children.slice(visibleItems.value.length - bufferSize, visibleItems.value.length);

      childrenWHList = subChildren.map((c) => {
        if (direction.value === 'left' || direction.value === 'right') {
          return c.offsetWidth;
        } else {
          return c.offsetHeight;
        }
      });
      bufferTotalWH = childrenWHList
        .reduce((a, b) => a + b, 0);
    }

    const updateOffset = () => {
      if (direction.value === 'up' || direction.value === 'left') {
        offset.value = 0;
      } else {
        offset.value = getFullWH() - realBoxWH;
      }
    }

    const animation = (isWheel, step) => {
      cancle();
      if (!listCanScroll) {
        return;
      }

      const scrollFun = () => {
        const singleWH = childrenWHList[0];
        let singleDone = false;
        if (singleOffset >= singleWH) {
          singleDone = true;
        }

        if (singleDone) {
          childrenWHList.shift();
          singleOffset = 0;
          count += 1;
        }
        if (count === total) {
          totalCount += 1;
          emit('count', totalCount);
          count = 0;
        }

        if (props.singleLine && singleDone) {
          singleState = true;
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
          if (direction.value === 'up' || direction.value === 'left') {
            offset.value += step;
          } else {
            offset.value -= step;
          }
          if (tempOffset > bufferTotalWH) {
            emit('offset', bufferSize, targetList);
            updateCursorIndex();
            nextTick(() => {
              updateOffset();
              tempOffset = 0;
              initWH();
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
        tempList = (direction.value === 'up' || direction.value === 'left') ? visibleItems.value : visibleItems.value.reverse();
        tempList.splice(...funArgs.value[1]);
        funArgs.value.slice(2).forEach(args => {
          tempList.push(...targetList.slice(...args));
        });
      } else {
        funArgs.value.slice(1).forEach(args => {
          tempList.push(...targetList.slice(...args));
        });
      }
      if (!((direction.value === 'up' || direction.value === 'left'))) {
        tempList.reverse();
      }
      console.log('Vue3SeamlessScroll---', 'bufferSize', bufferSize, 'visibleCount', visibleCount.value, 'funArgs', JSON.stringify(funArgs.value), 'tempList', tempList);
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

    const getFullWH = () => {
      const wh = Array.from(realWrapperRef.value.children)
        .map((c) => {
          if (direction.value === 'left' || direction.value === 'right') {
            return c.offsetWidth;
          } else {
            return c.offsetHeight;
          }
        }).reduce((a, b) => a + b, 0);
      return wh;
    }

    const initVisibleCount = (cb) => {
      if (props.visibleCount === (void 0)) {
        testList.value = listMap([props.list[0]]);
        nextTick(() => {
          if (direction.value === 'left' || direction.value === 'right') {
            visibleCount.value = Math.ceil(realBoxWH / realWrapperHiddenRef.value.offsetWidth) + 2;
          } else {
            visibleCount.value = Math.ceil(realBoxWH / realWrapperHiddenRef.value.offsetHeight) + 2;
          }
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

        realBoxWH = realWrapperRef.value.parentElement.offsetHeight;
        if (direction.value === 'left' || direction.value === 'right') {
          realBoxWH = realWrapperRef.value.parentElement.offsetWidth;
        }

        initVisibleCount(() => {
          let hasVerticalScroll = realWrapperHiddenRef.value.offsetHeight > realBoxWH;
          if (direction.value === 'left' || direction.value === 'right') {
            hasVerticalScroll = realWrapperHiddenRef.value.offsetWidth > realBoxWH;
          }
          if (hasVerticalScroll) {
            bufferSize = getBufferSize();

            funArgs.value = initCursorIndex();
            nextTick(() => {
              updateOffset();

              initWH();
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
      total = targetList.length;
    });

    const init = () => {
      count = 0;
      totalCount = 0;
      listCanScroll = false;
      bufferSize = 0;
      funArgs.value = [];
      nextTick(() => {
        updateOffset();

        tempOffset = 0;
        singleOffset = 0;
      });
    }

    const getBufferSize = () => {
      let tempBufferSize = targetList.length - visibleCount.value;
      tempBufferSize = Math.max(1, tempBufferSize);
      tempBufferSize = Math.min(5, tempBufferSize);
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
              visibleItems[i] = datas[0];
            })
          }
          if (tempBufferSize !== bufferSize) {
            bufferSize = tempBufferSize;
          }
        } else {
          const fun = () => {
            let hasVerticalScroll = realWrapperHiddenRef.value.offsetHeight > realBoxWH;
            if (direction.value === 'left' || direction.value === 'right') {
              hasVerticalScroll = realWrapperHiddenRef.value.offsetWidth > realBoxWH;
            }

            if (hasVerticalScroll) {
              bufferSize = tempBufferSize;
              funArgs.value = initCursorIndex();
              nextTick(() => {
                updateOffset();

                tempOffset = 0;
                singleOffset = 0;

                initWH();
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
      total = targetList.length;
    }

    const remove = (index, num = 1, cb) => {
      if (index >= 0 && index < targetList.length) {
        targetList.splice(index, num);
        if (listCanScroll) {
          testList.value = targetList.slice(0, visibleCount.value);
          nextTick(() => {
            let hasVerticalScroll = realWrapperHiddenRef.value.offsetHeight > realBoxWH;
            if (direction.value === 'left' || direction.value === 'right') {
              hasVerticalScroll = realWrapperHiddenRef.value.offsetWidth > realBoxWH;
            }

            if (hasVerticalScroll) {
              const tempBufferSize = getBufferSize();

              if (tempBufferSize !== bufferSize) {
                bufferSize = tempBufferSize;
              }
              funArgs.value = initCursorIndex();
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
      total = targetList.length;
    }


    const reset = () => {
      nextTick(() => {
        testList.value = targetList.slice(0, visibleCount.value);
        nextTick(() => {
          let hasVerticalScroll = realWrapperHiddenRef.value.offsetHeight > realBoxWH;
          if (direction.value === 'left' || direction.value === 'right') {
            hasVerticalScroll = realWrapperHiddenRef.value.offsetWidth > realBoxWH;
          }
          if (hasVerticalScroll) {
            if (funArgs.value[0] === 'splice') {
              updateCursorIndex();
              nextTick(() => {
                initWH();
              });
            } else {
              funArgs.value = initCursorIndex();
              nextTick(() => {
                initWH();
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
            visibleItems[i] = data;
          })
        }
      }
      if (!!cb && typeof cb === 'function') {
        cb(targetList);
      }
    }

    expose({ add, remove, update, reset });

    watch(() => props.modelValue, (val) => {
      if (val) {
        animation(false, props.step);
      }
    })

    onUnmounted(() => {
      cancelAnimationFrame(reqFrame);
      if (!!realWrapperRef.value) {
        realWrapperRef.value.parentElement.removeEventListener('mouseenter', onMouseenter);
        realWrapperRef.value.parentElement.removeEventListener('mouseleave', onMouseleave);
        realWrapperRef.value.parentElement.removeEventListener('wheel', onWheel);
      }
    });

    return {
      realBoxRef,
      realWrapperRef,
      visibleItems,
      offset,
      testList,
      realWrapperHiddenRef,
      transform,
    }
  }
});
</script>

<style scoped>
.vue3-seamless-wrapper {
  width: 100%;
  height: 100%;
}
</style>
