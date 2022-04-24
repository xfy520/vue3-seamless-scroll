<template>
  <!-- <div class="scroll">
    <div>默认配置</div>
    <vue3-seamless-scroll :list="list" :ease="ease">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>
  <div class="scroll">
    <div>手动控制滚动</div>
    <vue3-seamless-scroll :list="list" v-model="scroll">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>
  <div class="scroll">
    <div>向下滚动</div>
    <vue3-seamless-scroll :list="list" direction="down">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>

  <div class="scroll" style="width: 530px;">
    <div>向左滚动</div>
    <vue3-seamless-scroll :list="list" direction="left">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>

  <div class="scroll">
    <div>滚动速度</div>
    <vue3-seamless-scroll :list="list" :step="3">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div> -->

  <!-- <div class="scroll">
    <div>鼠标悬停</div>
    <vue3-seamless-scroll :list="list" hover wheel>
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div> -->

  <div class="scroll">
    <vue3-seamless-scroll :list="list" direction="left" :singleLine="true">
      <span v-for="(item, index) in list" :key="index">{{ item.title }}</span>
    </vue3-seamless-scroll>
  </div>

  <!-- <div class="scroll">
    <div>单步停顿</div>
    <vue3-seamless-scroll :list="list" :singleHeight="27">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>

  <div class="scroll">
    <div>单行停顿时间</div>
    <vue3-seamless-scroll :list="list" :singleHeight="27" :singleWaitTime="3000">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>

  <div class="scroll">
    <div>控制滚动，滚动{{ count }}次</div>
    <vue3-seamless-scroll :list="list" :count="count" @count="onCount">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>

  <div class="scroll">
    <div>数组属性更新</div>
    <vue3-seamless-scroll :list="list1">
      <div class="item" v-for="(item, index) in list1" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>

  <div class="scroll">
    <div>数组添加数据</div>
    <vue3-seamless-scroll :list="list2">
      <div class="item" v-for="(item, index) in list2" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>

  <div class="scroll">
    <div>插槽方式使用</div>
    <vue3-seamless-scroll :list="list">
      <div class="item" v-for="(item, index) in list" :key="index" @click="onClick(index)">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
      <template #html>
        <div class="item" v-for="(item, index) in list" :key="index" @click="onClick(index)">
          <span>{{ item.title }}</span>
          <span>{{ item.date }}</span>
        </div>
      </template>
    </vue3-seamless-scroll>
  </div> -->
</template>
<script lang="ts">
const listData = [
  {
    title: "Vue3.0 无缝滚动组件展示数据第 1 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 2 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 3 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 4 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 5 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 6 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 7 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 8 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 9 条",
    date: Date.now(),
  },
];
const listData1 = [
  {
    title: "Vue3.0 无缝滚动组件展示数据第 1 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 2 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 3 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 4 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 5 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 6 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 7 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 8 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 9 条",
    date: Date.now(),
  },
];
const listData2 = [
  {
    title: "Vue3.0 无缝滚动组件展示数据第 1 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 2 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 3 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 4 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 5 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 6 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 7 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 8 条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第 9 条",
    date: Date.now(),
  },
];
import { defineComponent, ref, onMounted } from "vue";
import { Vue3SeamlessScroll } from "../package/index";

export default defineComponent({
  name: "App",
  components: {
    Vue3SeamlessScroll,
  },
  setup() {
    const list = ref(listData);
    const list1 = ref(listData1);
    const list2 = ref(listData2);
    const scroll = ref(false);
    const count = ref(1);
    const ease = ref({
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1,
    });
    const notScroll = ref(false);

    onMounted(() => {
      setInterval(() => {
        list1.value[1].title = "我是第 2 条更新数据";
        list1.value[5].title = "我是第 6 条更新数据";
        list1.value[7].title = "我是第 8 条更新数据";
      }, 1000);

      setInterval(() => {
        list2.value.push({
          title: "我是新增的一条数据",
          date: Date.now(),
        });
      }, 2000);
      setInterval(() => {
        scroll.value = !scroll.value;
      }, 3000);
    });

    function onCount(num) {
      console.log(num);
      if (num === count.value) {
        setTimeout(() => {
          count.value = num + 1;
        }, 2000);
      }
    }

    function onClick(index) {
      alert(index);
    }

    return {
      list,
      list1,
      list2,
      scroll,
      count,
      onCount,
      onClick,
      ease,
      notScroll,
    };
  },
});
</script>
<style>
.scroll {
  display: flex;
  flex-direction: row;
  height: 40px;
  width: 100%;
  overflow: hidden;
  position: relative;
}

span {
  display: inline-block;
  height: 20px;
  margin-top: 12px;
  white-space: nowrap;
}

* {
  margin: 0;
  padding: 0;
}
</style>
