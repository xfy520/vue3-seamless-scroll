<template>
  <div class="vue3-seamless-wrapper" ref="realBoxRef">
    <div class="vue3-seamless-scroll-wrapper" ref="realWrapperRef" :style="{ transform: `translateY(-${offset}px)` }">
      <div v-for="item in visibleItems" :key="item.id">
        <slot :data="item.data" :index="item.index"> </slot>
      </div>
    </div>
    <div style="position: absolute; left: -999999px; width: 100%;" ref="realWrapperHiddenRef">
      <div v-for="item in testList" :key="item.id">
        <slot :data="item.data" :index="item.index"> </slot>
      </div>
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
    speed: {
      type: Number,
      default: 0.5,
    },
    visibleCount: {
      type: Number,
      required: true,
    },
    upScroll: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { expose }) {
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

    const bufferSize = ref(0);

    const funArgs = ref([]);

    const targetList = listMap(props.list);

    const cursorIndex = ref(-1);

    const realBoxHeight = ref(0);

    const offset = ref(0);

    const childrenHeightList = ref([]);

    const bufferTotalHeight = ref(0);

    const reqFrame = ref(null);

    const isHover = ref(false);

    const singleState = ref(false);

    const singleOffset = ref(0);

    const tempOffset = ref(0);

    const listCanScroll = ref(false);

    const skipUpdate = ref(false);

    const isScroll = computed(() => props.hover ? !isHover.value && props.modelValue : props.modelValue);

    const testList = ref(listMap(props.list.slice(0, props.visibleCount)));

    const cancle = () => {
      cancelAnimationFrame(reqFrame.value);
      reqFrame.value = null;
    }

    const animation = (isWheel, isUp, speed) => {
      cancle();

      if (!listCanScroll.value) {
        return;
      }

      const scrollFun = () => {
        if (props.singleLine && singleOffset.value >= childrenHeightList.value[0]) {
          singleState.value = true;
          childrenHeightList.value.shift();
          singleOffset.value = 0;
          setTimeout(() => {
            singleState.value = false;
            if (!isWheel) {
              animation(false, props.upScroll, props.speed);
            }
          }, props.singleWaitTime);
        } else {
          if (!isWheel) {
            animation(false, props.upScroll, props.speed);
          }
        }
      }
      if (isScroll.value && !singleState.value || isWheel) {
        reqFrame.value = requestAnimationFrame(() => {
          tempOffset.value += speed;
          singleOffset.value += speed;
          if (isUp) {
            offset.value += speed;
          } else {
            offset.value -= speed;
          }
          if (tempOffset.value > bufferTotalHeight.value) {
            const totalIndex = cursorIndex.value + bufferSize.value;
            if (totalIndex >= targetList.length) {
              const tempIndex = totalIndex - targetList.length;
              const tempFuns = ['splice',
                [0, bufferSize.value],
                [cursorIndex.value],
                [0, tempIndex]];
              funArgs.value = tempFuns;
              if (tempIndex > targetList.length) {
                cursorIndex.value = targetList.length;
              } else {
                cursorIndex.value = tempIndex;
              }
            } else {
              const tempFuns = ['splice', [0, bufferSize.value], [cursorIndex.value, totalIndex]];
              funArgs.value = tempFuns;
              cursorIndex.value = totalIndex;
            }
            nextTick(() => {
              tempOffset.value = 0;
              offset.value = isUp ? 0 : realBoxHeight.value;

              const children = isUp ? Array.from(realWrapperRef.value.children)
                .slice(0, bufferSize.value) : Array.from(realWrapperRef.value.children)
                  .slice(visibleItems.value.length - bufferSize.value, visibleItems.value.length);
              childrenHeightList.value = children.map((children) => children.offsetHeight);
              bufferTotalHeight.value = childrenHeightList.value
                .reduce((a, b) => a + b, 0);

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
        animation(false, props.upScroll, props.speed);
      }
    }

    const throttleFunc = throttle(30, (e) => {
      if (e.deltaY < 0 && !props.upScroll) {
        animation(true, false, 10);
      }
      if (e.deltaY > 0 && props.upScroll) {
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
      if (skipUpdate.value) {
        skipUpdate.value = false;
        return visibleItems.value;
      }
      let tempList = [];
      if (funArgs.value.length === 0) {
        tempList = targetList.slice(0, props.visibleCount);
      } else if (funArgs.value[0] === 'splice') {
        tempList = props.upScroll ? visibleItems.value : visibleItems.value.reverse();
        tempList.splice(...funArgs.value[1]);
        funArgs.value.slice(2).forEach(args => {
          tempList.push(...targetList.slice(...args));
        });
      } else {
        funArgs.value.slice(1).forEach(args => {
          tempList.push(...targetList.slice(...args));
        });
      }
      console.log('---', funArgs.value, '===', tempList);
      if (!props.upScroll) {
        tempList.reverse();
      }
      return duplicateId(tempList);
    });


    const initCursorIndex = () => {
      cursorIndex.value = props.visibleCount + bufferSize.value;
      if (cursorIndex.value >= targetList.length) {
        const tempIndex = cursorIndex.value - targetList.length;
        const tempFunArgs = ['slice', [0, cursorIndex.value], [0, tempIndex]];
        if (tempIndex > targetList.length) {
          cursorIndex.value = targetList.length;
        } else {
          cursorIndex.value = tempIndex;
        }
        return tempFunArgs;
      } else {
        return ['slice', [0, cursorIndex.value]];
      }
    }

    const initHeight = (element) => {
      const children = Array.from(element.children);
      const subChildren = props.upScroll ?
        children.slice(0, bufferSize.value) :
        children.slice(visibleItems.value.length - bufferSize.value, visibleItems.value.length);
      childrenHeightList.value = subChildren.map((c) => c.offsetHeight);
      bufferTotalHeight.value = childrenHeightList.value
        .reduce((a, b) => a + b, 0);
    }

    const resetData = () => {
      bufferSize.value = 0;
      funArgs.value = [];
      listCanScroll.value = false;
    }

    onMounted(() => {
      realBoxRef.value.addEventListener('mouseenter', onMouseenter);
      realBoxRef.value.addEventListener('mouseleave', onMouseleave);
      realBoxRef.value.addEventListener('wheel', onWheel);
      realBoxHeight.value = realBoxRef.value.offsetHeight;

      offset.value = props.upScroll ? 0 : realBoxHeight.value;

      nextTick(() => {
        const hasVerticalScroll = realWrapperHiddenRef.value.offsetHeight > realBoxHeight.value;
        if (hasVerticalScroll) {
          let tempBufferSize = Math.max(1, targetList.length - props.visibleCount);
          bufferSize.value = Math.min(5, tempBufferSize);
          funArgs.value = initCursorIndex();
          initHeight(realWrapperHiddenRef.value);
          listCanScroll.value = true;
          animation(false, props.upScroll, props.speed);
        } else {
          resetData();
        }
        testList.value = [];
      });
    });

    const reset = () => {
      offset.value = props.upScroll ? 0 : realBoxHeight.value;
      tempOffset.value = 0;
      singleOffset.value = 0;
    }

    const add = (index, value) => {
      if (index > targetList.length) {
        index = targetList.length;
      }

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
      }

      targetList.splice(index, 0, data);

      targetList.forEach((v, i) => {
        v.index = i;
      });

      let tempBufferSize = targetList.length - props.visibleCount;
      tempBufferSize = Math.max(1, tempBufferSize);
      tempBufferSize = Math.min(5, tempBufferSize);

      if (listCanScroll.value) {
        if (index < cursorIndex.value) {
          cursorIndex.value += 1;
          if (cursorIndex.value > targetList.length) {
            cursorIndex.value = 0;
          }
        }

        if (findIndexs.length > 0) {
          findIndexs.forEach((i) => {
            visibleItems[i] = data;
          })
        }
        if (tempBufferSize !== bufferSize.value) {
          bufferSize.value = tempBufferSize;
        }
      } else {
        testList.value = targetList.slice(0, props.visibleCount);
        nextTick(() => {
          const hasVerticalScroll = realWrapperHiddenRef.value.offsetHeight > realBoxHeight.value;
          if (hasVerticalScroll) {
            bufferSize.value = tempBufferSize;
            funArgs.value = initCursorIndex();
            reset();
            initHeight(realWrapperHiddenRef.value);
            listCanScroll.value = true;
            animation(false, props.upScroll, props.speed);
          } else {
            reset();
            resetData();
          }
          testList.value = [];
        })
      }
    }

    const remove = (index) => {
      const list = [...targetData.value.list];
      if (index >= 0 && index < list.length) {
        list.splice(index, 1);
        if (listCanScroll.value) {
          testList.value = list.slice(0, props.visibleCount);
          nextTick(() => {
            const hasVerticalScroll = realWrapperHiddenRef.value.offsetHeight > realBoxHeight.value;
            if (hasVerticalScroll) {
              let tempBufferSize = list.length - props.visibleCount;
              tempBufferSize = Math.max(1, tempBufferSize);
              tempBufferSize = Math.min(5, tempBufferSize);

              if (tempBufferSize !== bufferSize.value) {
                bufferSize.value = tempBufferSize;
              }

            } else {
              reset();
              resetData(list);
            }
            testList.value = [];
          })
        } else {

        }
      }
    }


    const update = (index, value) => {
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
    }

    expose({ add, remove, update });

    onUnmounted(() => {
      cancelAnimationFrame(reqFrame.value);
      if (realBoxRef.value) {
        realBoxRef.value.removeEventListener('mouseenter', onMouseenter);
        realBoxRef.value.removeEventListener('mouseleave', onMouseleave);
        realBoxRef.value.removeEventListener('wheel', onWheel);
      }
    });

    return {
      realBoxRef,
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
.vue3-seamless-scroll-wrapper {
  width: 100%;
  /* transition: transform cubic-bezier(0.03, 0.76, 1, 0.16); */
  transition: transform cubic-bezier(0, 0.47, 1, -0.37)
}

.vue3-seamless-wrapper {
  height: 100%;
}
</style>
