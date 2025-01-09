<template>
  <div class="vue3-seamless-horizontal-wrapper" ref="realBoxRef">
    <div class="vue3-seamless-horizontal-scroll-wrapper" ref="realWrapperRef"
      :style="{ transform: `translateX(-${offset}px)` }">
      <template v-for="item in visibleItems" :key="item.id">
        <slot :data="item.data" :index="item.index"> </slot>
      </template>
    </div>
    <div style="position: absolute; top: -999999px; height: 100%;" ref="realWrapperHiddenRef">
      <template v-for="item in testList" :key="item.id">
        <slot :data="item.data" :index="item.index"> </slot>
      </template>
    </div>
  </div>
</template>

<script>

import {
  computed, defineComponent, onMounted, ref,
  onUnmounted, nextTick
} from 'vue';

import { throttle, listMap, duplicateId, uuid } from './util';

export default defineComponent({
  name: 'HorizontalScroll',
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
    speed: {
      type: Number,
      default: 0.5,
    },
    visibleCount: {
      type: Number,
      required: true,
    },
    leftScroll: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit, expose }) {
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

    const isScroll = computed(() => props.hover ? !isHover.value && props.modelValue : props.modelValue);

    const testList = ref(listMap(props.list.slice(0, props.visibleCount)));

    const targetList = listMap(props.list);

    let childrenWidthList = [];

    let bufferTotalWidth = 0;

    let bufferSize = 0;

    let cursorIndex = -1;

    let realBoxWidth = 0;

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

    const initWidth = () => {
      const children = Array.from(realWrapperRef.value.children);
      const subChildren = props.leftScroll ?
        children.slice(0, bufferSize) :
        children.slice(visibleItems.value.length - bufferSize, visibleItems.value.length);

      childrenWidthList = subChildren.map((c) => c.offsetWidth);
      bufferTotalWidth = childrenWidthList
        .reduce((a, b) => a + b, 0);
      console.log(bufferTotalWidth)
    }

    const animation = (isWheel, isUp, speed) => {
      cancle();
      if (!listCanScroll) {
        return;
      }

      const scrollFun = () => {
        if (props.singleLine && singleOffset >= childrenWidthList[0]) {
          singleState = true;
          childrenWidthList.shift();
          singleOffset = 0;
          setTimeout(() => {
            singleState = false;
            if (!isWheel) {
              animation(false, props.leftScroll, props.speed);
            }
          }, props.singleWaitTime);
        } else {
          if (!isWheel) {
            animation(false, props.leftScroll, props.speed);
          }
        }
      }
      if (isScroll.value && !singleState || isWheel) {
        reqFrame = requestAnimationFrame(() => {
          tempOffset += speed;
          singleOffset += speed;
          if (isUp) {
            offset.value += speed;
          } else {
            offset.value -= speed;
          }
          if (tempOffset > bufferTotalWidth) {
            emit('offset');
            updateCursorIndex();
            nextTick(() => {
              offset.value = props.leftScroll ? 0 : getFullWidth() - realBoxWidth;
              tempOffset = 0;
              initWidth();
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
        animation(false, props.leftScroll, props.speed);
      }
    }

    const throttleFunc = throttle(30, (e) => {
      if (e.deltaY < 0 && !props.leftScroll) {
        animation(true, false, 10);
      }
      if (e.deltaY > 0 && props.leftScroll) {
        animation(true, true, 10);
      }
    });

    const onWheel = (e) => {
      if (props.hover && props.wheel) {
        throttleFunc(e);
      }
    };

    /**
    * @type {import('vue').ComputedRef<Array<any>>}
    */
    const visibleItems = computed(() => {
      let tempList = [];
      if (funArgs.value.length === 0) {
        tempList = targetList.slice(0, props.visibleCount);
      } else if (funArgs.value[0] === 'splice') {
        tempList = props.leftScroll ? visibleItems.value : visibleItems.value.reverse();
        tempList.splice(...funArgs.value[1]);
        funArgs.value.slice(2).forEach(args => {
          tempList.push(...targetList.slice(...args));
        });
      } else {
        funArgs.value.slice(1).forEach(args => {
          tempList.push(...targetList.slice(...args));
        });
      }
      if (!props.leftScroll) {
        tempList.reverse();
      }
      return duplicateId(tempList);
    });

    const initCursorIndex = () => {
      cursorIndex = props.visibleCount + bufferSize;
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


    const getFullWidth = () => {
      return Array.from(realWrapperRef.value.children)
        .map((c) => c.offsetWidth).reduce((a, b) => a + b, 0);
    }

    onMounted(() => {
      realBoxRef.value.addEventListener('mouseenter', onMouseenter);
      realBoxRef.value.addEventListener('mouseleave', onMouseleave);
      realBoxRef.value.addEventListener('wheel', onWheel);
      realBoxWidth = realBoxRef.value.offsetWidth;
      nextTick(() => {
        const hasVerticalScroll = realWrapperHiddenRef.value.offsetWidth > realBoxWidth;
        if (hasVerticalScroll) {
          bufferSize = getBufferSize();
          funArgs.value = initCursorIndex();
          nextTick(() => {
            offset.value = props.leftScroll ? 0 : getFullWidth() - realBoxWidth;
            initWidth();
            listCanScroll = true;
            animation(false, props.leftScroll, props.speed);
          })
        } else {
          init();
        }
        testList.value = [];
      });
    });

    const init = () => {
      listCanScroll = false;
      bufferSize = 0;
      funArgs.value = [];
      nextTick(() => {
        offset.value = props.leftScroll ? 0 : getFullWidth() - realBoxWidth;
        tempOffset = 0;
        singleOffset = 0;
      });
    }

    const getBufferSize = () => {
      let tempBufferSize = targetList.length - props.visibleCount;
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
          if (values.length === 1) {
            findIndexs.forEach((i) => {
              console.log(visibleItems[i])
              visibleItems[i] = datas[0];
            })
          }
          console.log(visibleItems.value)
          if (tempBufferSize !== bufferSize) {
            bufferSize = tempBufferSize;
          }
        } else {
          testList.value = targetList.slice(0, props.visibleCount);
          nextTick(() => {
            const hasVerticalScroll = realWrapperHiddenRef.value.offsetWidth > realBoxWidth;
            if (hasVerticalScroll) {
              bufferSize = tempBufferSize;
              funArgs.value = initCursorIndex();
              nextTick(() => {
                offset.value = props.leftScroll ? 0 : getFullWidth() - realBoxWidth;
                tempOffset = 0;
                singleOffset = 0;

                initWidth();
                listCanScroll = true;
                animation(false, props.leftScroll, props.speed);
              });
            } else {
              init();
            }
            testList.value = [];
          })
        }
      }
      if (!!cb && typeof cb === 'function') {
        cb(targetList);
      }
    }

    const remove = (index, cb) => {
      if (index >= 0 && index < targetList.length) {
        targetList.splice(index, 1);
        if (listCanScroll) {
          testList.value = targetList.slice(0, props.visibleCount);
          nextTick(() => {
            const hasVerticalScroll = realWrapperHiddenRef.value.offsetWidth > realBoxWidth;
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
                    initWidth();
                  });
                } else {
                  funArgs.value = initCursorIndex();
                  nextTick(() => {
                    initWidth();
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
        testList.value = targetList.slice(0, props.visibleCount);
        nextTick(() => {
          const hasVerticalScroll = realWrapperHiddenRef.value.offsetWidth > realBoxWidth;
          if (hasVerticalScroll) {
            if (funArgs.value[0] === 'splice') {
              updateCursorIndex();
              nextTick(() => {
                initWidth();
              });
            } else {
              funArgs.value = initCursorIndex();
              nextTick(() => {
                initWidth();
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

    onUnmounted(() => {
      cancelAnimationFrame(reqFrame);
      if (realBoxRef.value) {
        realBoxRef.value.removeEventListener('mouseenter', onMouseenter);
        realBoxRef.value.removeEventListener('mouseleave', onMouseleave);
        realBoxRef.value.removeEventListener('wheel', onWheel);
      }
    });

    return {
      visibleItems,
      offset,
      testList,
      realBoxRef,
      realWrapperRef,
      realWrapperHiddenRef
    }
  }
});
</script>

<style scoped>
.vue3-seamless-horizontal-scroll-wrapper {
  height: 100%;
  transition: transform cubic-bezier(0.03, 0.76, 1, 0.16);
}

.vue3-seamless-horizontal-wrapper {
  width: 100%;
}
</style>