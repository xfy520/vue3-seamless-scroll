<template>
  <div class="vue3-seamless-wrapper" ref="realBoxRef">
    <div class="vue3-seamless-scroll-wrapper" ref="realWrapperRef" :style="{ transform: `translateY(-${offset}px)` }">
      <div v-for="item in visibleItems" :key="item.id">
        <slot :data="item.data" :index="item.index"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed, defineComponent, onMounted, ref,
  onUnmounted, nextTick, watch
} from 'vue';

import { throttle, listMap } from './util';

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
      default: 0.01,
    },
    visibleCount: {
      type: Number,
    },
    bufferSize: {
      type: Number,
      default: 5,
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

    const visibleCount = ref(props.visibleCount);

    const targetData = ref({
      list: listMap(props.list),
      bufferSize: props.bufferSize
    });

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

    const scrollState = ref(false);

    const isScroll = computed(() => props.hover ? !isHover.value && props.modelValue : props.modelValue);

    const funs = ref([]);

    const cancle = () => {
      cancelAnimationFrame(reqFrame.value);
      reqFrame.value = null;
    }

    const animation = (isWheel, isUp, speed) => {
      cancle();

      const scrollFun = () => {
        if (props.singleLine && singleOffset.value >= childrenHeightList.value[0]) {
          singleState.value = true;
          childrenHeightList.value.shift();
          singleOffset.value = 0;
          setTimeout(() => {
            singleState.value = false;
            if (!isWheel) {
              animation(false, props.upScroll, props.step);
            }
          }, props.singleWaitTime);
        } else {
          if (!isWheel) {
            animation(false, props.upScroll, props.step);
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
            if ((cursorIndex.value + targetData.value.bufferSize) > targetData.value.list.length) {
              const tempIndex = (cursorIndex.value + targetData.value.bufferSize) - targetData.value.list.length;
              funs.value = ['splice', [0, targetData.value.bufferSize], [cursorIndex.value], [0, tempIndex]];
              cursorIndex.value = tempIndex;
            } else {
              funs.value = ['splice', [0, targetData.value.bufferSize], [cursorIndex.value, cursorIndex.value + targetData.value.bufferSize]];
              cursorIndex.value = cursorIndex.value + targetData.value.bufferSize;
            }
            nextTick(() => {
              tempOffset.value = 0;
              offset.value = isUp ? 0 : realBoxHeight.value;
              const children = isUp ? Array.from(realWrapperRef.value.children)
                .slice(0, targetData.value.bufferSize) : Array.from(realWrapperRef.value.children)
                  .slice(visibleItems.value.length - targetData.value.bufferSize, visibleItems.value.length);
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
        animation(false, props.upScroll, props.step);
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
      if (cursorIndex.value === -1) {
        return [targetData.value.list[0]];
      }
      let tempList = [];
      if (targetData.value.bufferSize === 0) {
        tempList = targetData.value.list;
      } else if (funs.value[0] === 'splice') {
        tempList = props.upScroll ? visibleItems.value : visibleItems.value.reverse();
        tempList.splice(...funs.value[1]);
        funs.value.slice(2).forEach(args => {
          tempList.push(...targetData.value.list.slice(...args));
        });
      } else {
        funs.value.slice(1).forEach(args => {
          tempList.push(...targetData.value.list.slice(...args));
        });
      }
      if (!props.upScroll) {
        tempList.reverse();
      }
      return tempList;
    });

    onMounted(() => {
      realBoxRef.value.addEventListener('mouseenter', onMouseenter);
      realBoxRef.value.addEventListener('mouseleave', onMouseleave);
      realBoxRef.value.addEventListener('wheel', onWheel);
      realBoxHeight.value = realBoxRef.value.offsetHeight;

      offset.value = props.upScroll ? 0 : realBoxHeight.value;

      if (visibleCount.value === (void 0)) {
        const firstChildHeight = props.upScroll ? realWrapperRef.value.firstElementChild.offsetHeight
          : realWrapperRef.value.lastElementChild.offsetHeight;
        visibleCount.value = Math.floor(realBoxHeight.value / firstChildHeight);
      }
      if (visibleCount.value + targetData.value.bufferSize > targetData.value.list.length) {
        targetData.value.bufferSize = targetData.value.list.length - visibleCount.value;
      }
      cursorIndex.value = visibleCount.value + targetData.value.bufferSize;

      if (cursorIndex.value > targetData.value.list.length) {
        const tempIndex = cursorIndex.value - targetData.value.list.length;
        const tempFuns = ['slice', [0, cursorIndex.value], [0, tempIndex]]
        funs.value = tempFuns;
        cursorIndex.value = tempIndex;
      } else {
        funs.value = ['slice', [0, cursorIndex.value]];
      }

      nextTick(() => {
        const children = Array.from(realWrapperRef.value.children);

        const subChildren = props.upScroll ?
          children.slice(0, targetData.value.bufferSize) :
          children.slice(visibleItems.value.length - targetData.value.bufferSize, visibleItems.value.length);

        childrenHeightList.value = subChildren.map((c) => c.offsetHeight);

        bufferTotalHeight.value = childrenHeightList.value
          .reduce((a, b) => a + b, 0);

        const hasVerticalScroll = realBoxRef.value.scrollHeight > realBoxRef.value.offsetHeight;
        if (hasVerticalScroll) {
          scrollState.value = true;
          animation(false, props.upScroll, props.step);
        }
      });
    });

    watch(props.list, (nVal) => {
      let tempBufferSize = targetData.value.bufferSize;
      if (visibleCount.value + tempBufferSize > nVal.length) {
        tempBufferSize = nVal.length - visibleCount.value;
      }

      targetData.value = {
        list: listMap(nVal),
        bufferSize: tempBufferSize <= 0 ? 0 : tempBufferSize
      }
    });


    const add = (index, data) => {
      const findValue = visibleItems.value.find((v) => v.index === index);
      const findIndex = visibleItems.value.findIndex((v) => v.index === index);
      if (!!findValue && findIndex > -1) {

      } else {

      }

      targetData.value.list.splice(index, 0, {
        id: data.id !== (void 0) ? data.id : Date.now()
      });

    }

    const remove = (index) => {

    }


    const update = (index, value) => {

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
