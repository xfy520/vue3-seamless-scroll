# vue3-seamless-scroll

Vue3.0 无缝滚动组件，支持Vite2.0，支持服务端打包，[更多使用方式看例子](https://github.com/xfy520/vue3-seamless-scroll/blob/v3.1/src/App.vue)

> 目前组件支持上下左右无缝滚动，单步滚动，并且支持复杂图标的无缝滚动，目前组件支持平台与`Vue3.0`支持平台一致。

## 安装

- `npm`

  ```shell
  npm install vue3-seamless-scroll --save
  ```

- `Yarn`

  ```shell
  yarn add vue3-seamless-scroll
  ```

- `browser`

  ```html
  <script src="https://unpkg.com/browse/vue3-seamless-scroll@3.0.0/dist/vue3-seamless-scroll.min.js"></script>
  ```

## 组件配置

- `list`

  > 无缝滚动列表数据。

  ```json
    type: Array
    required: true
  ```

- `visibleCount`

  > 满足多少条数据时开启滚动，当每一条数据高度或者宽度一致时组件内会自动计算，否则最好手动指定

  ```json
    type: Number
    required: false
  ```

- `v-model`

  > 通过v-model控制动画滚动与停止，默认开始滚动

  ```json
    type: Boolean,
    default: true,
    required: false
  ```

- `direction`

  > 控制滚动方向，可选值`up`，`down`，`left`，`right`

  ```json
    type: String,
    default: "up",
    required: false
  ```

- `hover`

  > 是否开启鼠标悬停

  ```json
    type: Boolean,
    default: false,
    required: false
  ```

- `step`

  > 步进速度

  ```json
    type: Number,
    default: 0.5,
    required: false
  ```

- `singleWaitTime`

  > 单步停止等待时间(默认值 1000ms)

  ```json
    type: Number,
    default: 1000,
    required: false
  ```

- `delay`

  > 动画延时时间

  ```json
    type: Number,
    default: 0,
    required: false
  ```

- `ease`

  > 动画效果，可以传入贝塞尔曲线数值

  ```json
    type: String,
    default: "cubic-bezier(0.03, 0.76, 1, 0.16)",
    required: false
  ```

- `wheel`

  > 在开启鼠标悬停的情况下是否开启滚轮滚动，默认不开启

  ```json
    type: boolean,
    default: false,
    required: false
  ```

- `singleLine`

  > 启用单行横向滚动

  ```json
    type: boolean,
    default: false,
    required: false
  ```

## 注意项

> 需要滚动的列表所在容器必须设置样式 `overflow: hidden`;

## 使用

### 注册组件

- 全局组件注册 `install`

```JavaScript
  // **main.js**
  import { createApp } from 'vue';
  import App from './App.vue';
  import vue3SeamlessScroll from "vue3-seamless-scroll";
  const app = createApp(App);
  app.use(vue3SeamlessScroll);
  app.mount('#app');
```

- 单个.vue文件局部注册

```html
<script>
  import { defineComponent } from "vue";
  import { Vue3SeamlessScroll, VerticalScroll, HorizontalScroll } from "vue3-seamless-scroll";
   export default defineComponent({
      components: {
        Vue3SeamlessScroll, // 横竖向
        VerticalScroll, // 竖向
        HorizontalScroll // 横向
      }
   })
</script>
```

### 使用组件

```html
<template>
  <div class="vertical-scoll">
    <vertical-scroll :list="list">
      <template v-slot="{ data }">
        <span style="width: 100%; display: block; line-height: 30px;">
          <div>{{ data.name }}</div>
        </span>
      </template>
    </vertical-scroll>
  </div>
  <div class="horizonta-scoll">
    <horizontal-scroll :list="list">
      <template v-slot="{ data }">
        <div class="vertical-text">
          {{ data.name }}
        </div>
      </template>
    </horizontal-scroll>
  </div>
  <div class="vertical-scoll">
    <vue3-seamless-scroll :list="list">
      <template v-slot="{ data }">
        <span style="width: 100%; display: block; line-height: 30px;">
          <div>{{ data.name }}</div>
        </span>
      </template>
    </vue3-seamless-scroll>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { Vue3SeamlessScroll,VerticalScroll,HorizontalScroll } from "vue3-seamless-scroll";

const listData = Array.from({ length: 10000 }, (_, i) => ({
  id: Date.now() + i + 1,
  name: `Vue3.0无缝滚动展示数据第${i + 1}条`,
}));

export default defineComponent({
  name: "App",
  components: {
    Vue3SeamlessScroll,
    VerticalScroll,
    HorizontalScroll
  },
  setup() {
    const list = ref(listData);
    return {
      list,
    }
  },
});
</script>

<style>
.vertical-scoll {
  overflow: hidden;
  height: 300px;
}

.horizonta-scoll {
  overflow: hidden;
  height: 300px;
}


.vertical-text {
  height: 300px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  line-height: 30px;
  display: inline-block;
}
</style>