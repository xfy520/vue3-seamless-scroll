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

  <div class="scroll">
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
    <vue3-seamless-scroll :list="list" hover>
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
</template>
<script lang="ts">

const listData = [
  {
    title: "Vue3.0 无缝滚动组件展示数据第1条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第2条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第3条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第4条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第5条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第6条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第7条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第8条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第9条",
    date: Date.now(),
  },
];
const listData1 = [
  {
    title: "Vue3.0 无缝滚动组件展示数据第1条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第2条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第3条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第4条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第5条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第6条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第7条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第8条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第9条",
    date: Date.now(),
  },
];
const listData2 = [
  {
    title: "Vue3.0 无缝滚动组件展示数据第1条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第2条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第3条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第4条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第5条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第6条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第7条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第8条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第9条",
    date: Date.now(),
  },
]
import { defineComponent, ref, onMounted } from 'vue'
import { Vue3SeamlessScroll } from '../package/index'

export default defineComponent({
  name: 'App',
  components: {
    Vue3SeamlessScroll
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
    })

    onMounted(() => {
      setInterval(() => {
        list1.value[1].title = "我是第2条更新数据";
        list1.value[5].title = "我是第6条更新数据";
        list1.value[7].title = "我是第8条更新数据";
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
      ease
    }
  }
})
</script>
<style>
.scroll {
  display: inline-block;
  height: 300px;
  width: 390px;
  margin: 0 25px;
  overflow: hidden;
  position: relative;
}

.scroll > div:first-child {
  font-weight: bold;
  color: red;
  text-align: center;
}

.scroll > div:last-child {
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
</style>
