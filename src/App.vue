<template>
  <div class="scroll">
    <div>默认配置</div>
    <VerticalScroll :list="list" :step="0.2" :visibleCount="5" hover :bufferSize="3" ref="verticalScrollRef">
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
  <!-- <div class="scroll">
    <div>默认配置</div>
    <div>
      <VerticalScroll :list="list" :step="0.5">
        <template v-slot="{ data, index }">
          <div>
            {{ data.name }}
          </div>
        </template>
      </VerticalScroll>
    </div>
  </div> -->
</template>
<script lang="ts">
const listData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
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
      setInterval(() => {
        // list.value.push({
        //   id: list.value.length + 1,
        //   name: `Vue3.0 无缝滚动组件展示数据第 ${list.value.length + 1} 条`
        // })
        if (list.value.length === 6) {
          return
        }
        list.value.splice(2, 1);
        // console.log('-------------', list.value.length);
      }, 2000);
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
  height: 180px;
  width: 390px;
  margin: 0 25px;
  overflow: hidden;
  position: relative;
}
</style>
