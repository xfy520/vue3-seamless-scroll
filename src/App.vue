<template>
  <div class="scroll">
    <div>默认配置</div>
    <VerticalScroll :list="list" :speed="0.3" :visibleCount="10" ref="verticalScrollRef">
      <template v-slot="{ data, index }">
        <span style="width: 100%; display: block; line-height: 30px;">
          <template v-if="data.id % 2 === 0">
            <div>{{ data.name }}</div>
          </template>
          <template v-else>
            <div>{{ data.name }}</div>
            <div>{{ data.name }}</div>
          </template>
          <!-- <div>{{ data.name }}</div> -->
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
    <VerticalScroll :list="list" :speed="1" singleLine :visibleCount="10" ref="verticalScrollRef">
      <template v-slot="{ data, index }">
        <span style="width: 100%; display: block; line-height: 30px;">
          <template v-if="data.id % 2 === 0">
            <div>{{ data.name }}</div>
          </template>
          <template v-else>
            <div>{{ data.name }}</div>
            <div>{{ data.name }}</div>
          </template>
          <!-- <div>{{ data.name }}</div> -->
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
    <VerticalScroll :list="list" :speed="2" :visibleCount="10" ref="verticalScrollRef" :upScroll="false">
      <template v-slot="{ data, index }">
        <span style="width: 100%; display: block; line-height: 30px;">
          <template v-if="data.id % 2 === 0">
            <div>{{ data.name }}</div>
          </template>
          <template v-else>
            <div>{{ data.name }}</div>
            <div>{{ data.name }}</div>
          </template>
          <!-- <div>{{ data.name }}</div> -->
        </span>
      </template>
    </VerticalScroll>
  </div>
</template>
<script lang="ts">
const listData = Array.from({ length: 10000 }, (_, i) => ({
  id: Date.now() + i + 1,
  name: `Vue3.0 无缝滚动组件展示数据第 ${i + 1} 条`,
}));
import { defineComponent, onMounted, ref } from 'vue';
import { VerticalScroll } from '../package/index';

export default defineComponent({
  name: "App",
  components: {
    VerticalScroll
  },
  setup() {
    const list = ref(listData);
    const verticalScrollRef = ref();
    onMounted(() => {
      setTimeout(() => {
        verticalScrollRef.value.add(2, {
          id: 5,
          name: `Vue3.0 无缝滚动组件展示数据第 ${Date.now()} 条`
        })
      }, 1000);
      setTimeout(() => {
        verticalScrollRef.value.add(5, {
          id: 6,
          name: `Vue3.0 无缝滚动组件展示数据第 ${Date.now()} 条`
        })
      }, 2000);
      setTimeout(() => {
        verticalScrollRef.value.add(3, {
          id: 999,
          name: `Vue3.0 无缝滚动组件展示数据第 ${Date.now()} 条`
        })
      }, 5000);
      // setTimeout(() => {
      //   verticalScrollRef.value.remove(3);
      // }, 1000);
      // setTimeout(() => {
      //   verticalScrollRef.value.update(1,
      //     {
      //       id: 5,
      //       name: `Vue3.0 无缝滚动组件展示数据第 ${Date.now()} 条`
      //     }
      //   );
      // }, 1000);
    })

    return {
      list,
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
  height: 300px;
  width: 390px;
  margin: 0 25px;
  overflow: hidden;
  position: relative;
}
</style>
