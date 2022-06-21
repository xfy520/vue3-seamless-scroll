<template>
  <div class="scroll">
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

  <div class="scroll" style="width: 400px;">
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
  </div>

   <div class="scroll">
    <div>鼠标悬停</div>
    <vue3-seamless-scroll :list="list" hover wheel>
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>

  <div class="scroll">
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
  </div>
  <div class="scroll">
    <div>未达到滚动条件直接显示原有的数据</div>
    <vue3-seamless-scroll :list="list2" :ease="ease" :limitScrollNum="6">
      <div class="item" v-for="(item, index) in list2" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>
  <div class="scroll">
    <div>异步数据触发滚动</div>
    <vue3-seamless-scroll :list="syacList" :ease="ease">
      <div class="item" v-for="(item, index) in syacList" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>
  <div class="scroll" :style="{height: `${height}px`}">
    <div>父级div高度改变</div>
    <vue3-seamless-scroll :list="list" :ease="ease">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>
  <div>
    <div style="font-weight: bold; color: red; text-align: center;">单行滚动</div>
    <div class="singleLine">
      <vue3-seamless-scroll :list="list" direction="left" :singleLine="true">
        <span v-for="(item, index) in list" :key="index">{{ item.title }}</span>
      </vue3-seamless-scroll>
    </div> 
  </div>
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
    const syacList = ref();
    const scroll = ref(false);
    const count = ref(1);
    const ease = ref({
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1,
    });
    const height = ref(500);
    let timer1: NodeJS.Timer;

    onMounted(() => {
      setTimeout(() => {
        syacList.value = listData
        height.value = 180;
      }, 5000);

      setInterval(() => {
        list1.value[1].date =  Date.now();
        list1.value[3].date = Date.now();
      }, 2000);

      timer1 = setInterval(() => {
        list2.value.push({
          title: "Vue3.0 无缝滚动组件展示数据第 "+(list2.value.length+1)+" 条",
          date: Date.now(),
        });
        if (list2.value.length === 9) {
          clearInterval(timer1)
        }
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
      syacList,
      scroll,
      count,
      onCount,
      onClick,
      ease,
      height,
    };
  },
});
</script>
<style>
.singleLine {
  display: flex;
  flex-direction: row;
  height: 40px;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.singleLine span {
  display: inline-block;
  height: 20px;
  margin-top: 12px;
  white-space: nowrap;
}

.scroll {
  display: inline-block;
  height: 180px;
  width: 390px;
  margin: 0 25px;
  overflow: hidden;
  position: relative;
}

.scroll>div:first-child {
  font-weight: bold;
  color: red;
  text-align: center;
}

.scroll>div:last-child {
  margin-top: 15px;
  height: 260px;
  overflow: hidden;
}

.scroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
  cursor: pointer;
}

* {
  margin: 0;
  padding: 0;
}
</style>
