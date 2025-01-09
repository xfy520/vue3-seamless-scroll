<template>
  <!-- <div class="scroll" :style="{ height: `${height}px` }">
    <div>默认配置</div>
    <VerticalScroll :list="list" :speed="0.3" :visibleCount="10" ref="verticalScrollRef1"
      :style="{ height: `${height}px` }">
      <template v-slot="{ data, index }">
        <span style="width: 100%; display: block; line-height: 30px;">
          <template v-if="data.id % 2 === 0">
            <div>{{ data.name }}</div>
          </template>
<template v-else>
            <div>{{ data.name }}</div>
            <div>{{ data.name }}</div>
          </template>
</span>
</template>
</VerticalScroll>
</div>
<div class="scroll">
  <div>快速</div>
  <div>
    <VerticalScroll :list="list" :speed="1" :visibleCount="12">
      <template v-slot="{ data, index }">
          <div style="width: 100%; line-height: 30px;">
            {{ data.name }}
          </div>
        </template>
    </VerticalScroll>
  </div>
</div>
<div class="scroll">
  <div>单步</div>
  <VerticalScroll :list="list" :speed="1" singleLine :visibleCount="10" ref="verticalScrollRef2">
    <template v-slot="{ data, index }">
        <span style="width: 100%; display: block; line-height: 30px;">
          <template v-if="data.id % 2 === 0">
            <div>{{ data.name }}</div>
          </template>
    <template v-else>
            <div>{{ data.name }}</div>
            <div>{{ data.name }}</div>
          </template>
    </span>
    </template>
  </VerticalScroll>
</div>
<div class="scroll">
  <div>单步加单步时间</div>
  <div>
    <VerticalScroll :list="list" :speed="1" singleLine :singleWaitTime="3000" :visibleCount="12">
      <template v-slot="{ data, index }">
          <div style="width: 100%; line-height: 30px;">
            {{ data.name }}
          </div>
        </template>
    </VerticalScroll>
  </div>
</div>
<div class="scroll">
  <div>向下</div>
  <VerticalScroll :list="list" :speed="1" :visibleCount="6" ref="verticalScrollRef3" :upScroll="false">
    <template v-slot="{ data, index }">
        <span style="width: 100%; display: block; line-height: 30px;">
          <template v-if="data.id % 2 === 0">
            <div>{{ data.name }}</div>
          </template>
    <template v-else>
            <div>{{ data.name }}</div>
            <div>{{ data.name }}</div>
          </template>
    </span>
    </template>
  </VerticalScroll>
</div> -->

  <div style="width: 200px; height: 368px; overflow: hidden; white-space: nowrap;">
    <div>默认配置</div>
    <HorizontalScroll :list="list" :speed="0.5" :visibleCount="7" :leftScroll="false" ref="verticalScrollRef">
      <template v-slot="{ data, index }">
        <div style="writing-mode: vertical-rl; text-orientation: upright; width: 30px; display: inline-block;">
          {{ data.name }}
        </div>
      </template>
    </HorizontalScroll>
  </div>
</template>
<script lang="ts">
const listData = Array.from({ length: 10000 }, (_, i) => ({
  id: Date.now() + i + 1,
  name: `Vue3.0 无缝滚动组件展示数据第 ${i + 1} 条`,
}));
import { defineComponent, onMounted, ref } from 'vue';
import { VerticalScroll, HorizontalScroll } from '../package/index';

export default defineComponent({
  name: "App",
  components: {
    VerticalScroll,
    HorizontalScroll
  },
  setup() {
    const list = ref(listData);
    const height = ref(180);
    const verticalScrollRef = ref();
    onMounted(() => {
      setTimeout(() => {
        verticalScrollRef.value.add(2, [{
          id: 5,
          name: `Vue3.0 无缝滚动组件展示数据第 ${Date.now()} 条`
        }])
      }, 1000);
      // setTimeout(() => {
      //   verticalScrollRef.value.add(5, {
      //     id: 6,
      //     name: `Vue3.0 无缝滚动组件展示数据第 ${Date.now()} 条`
      //   })
      // }, 2000);
      // setTimeout(() => {
      //   verticalScrollRef.value.add(3, {
      //     id: 999,
      //     name: `Vue3.0 无缝滚动组件展示数据第 ${Date.now()} 条`
      //   })
      // }, 5000);
      // setTimeout(() => {
      //   verticalScrollRef.value.remove(6);
      // }, 10000);
      // setTimeout(() => {
      //   verticalScrollRef.value.update(1,
      //     {
      //       id: 5,
      //       name: `Vue3.0 无缝滚动组件展示数据第 ${Date.now()} 条`
      //     }
      //   );
      // }, 1000);
      setTimeout(() => {
        // verticalScrollRef1.value.reset();
      }, 3000);
    })

    return {
      list,
      height,
      verticalScrollRef
    };
  },
});
</script>
<style>
.scroll {
  display: inline-block;
}

.scroll>div:last-child {
  height: 180px;
  width: 390px;
  margin: 0 25px;
  overflow: hidden;
  position: relative;
}
</style>
