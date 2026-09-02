# vue3-seamless-scroll

A high-performance seamless scrolling component for **Vue 3**, with support for virtualized rendering, large datasets, infinite scrolling, multiple directions, and step-by-step scrolling.

Designed for dashboards, monitoring screens, data visualization, news tickers, rankings, tables, and other scenarios where continuously scrolling content is required.

## Features

* 🚀 Built for Vue 3
* ♻️ Seamless / continuous scrolling
* ⚡ Virtualized rendering for large datasets
* ♾️ Infinite scrolling with paginated data loading
* ↕️ Vertical scrolling
* ↔️ Horizontal scrolling
* 🔄 Supports `up`, `down`, `left`, and `right`
* ⏱️ Step-by-step scrolling with configurable waiting time
* 🖱️ Pause on hover
* 🖱️ Optional mouse-wheel interaction
* 🎛️ Programmatically start and stop scrolling with `v-model`
* 🧩 Supports custom and complex item content
* 📦 Global or local component registration
* 📝 Built-in TypeScript declarations

## Installation

### npm

```bash
npm install vue3-seamless-scroll
```

### yarn

```bash
yarn add vue3-seamless-scroll
```

## Quick Start

### Local registration

```vue
<script setup>
import { ref } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

const list = ref(
  Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`
  }))
)
</script>

<template>
  <div class="scroll-container">
    <Vue3SeamlessScroll :list="list">
      <template #default="{ data }">
        <div class="scroll-item">
          {{ data.name }}
        </div>
      </template>
    </Vue3SeamlessScroll>
  </div>
</template>

<style scoped>
.scroll-container {
  height: 300px;
  overflow: hidden;
}

.scroll-item {
  height: 30px;
  line-height: 30px;
}
</style>
```

> The outer scrolling container must use `overflow: hidden`.

## Global Registration

```js
import { createApp } from 'vue'
import App from './App.vue'
import vue3SeamlessScroll from 'vue3-seamless-scroll'

const app = createApp(App)

app.use(vue3SeamlessScroll)

app.mount('#app')
```

## Components

The package provides the following components:

```js
import {
  Vue3SeamlessScroll,
  VerticalScroll,
  HorizontalScroll
} from 'vue3-seamless-scroll'
```

### `Vue3SeamlessScroll`

General-purpose seamless scrolling component supporting both vertical and horizontal scrolling.

### `VerticalScroll`

Component optimized for vertical scrolling.

### `HorizontalScroll`

Component optimized for horizontal scrolling.

## Vertical Scrolling

```vue
<script setup>
import { ref } from 'vue'
import { VerticalScroll } from 'vue3-seamless-scroll'

const list = ref([
  { id: 1, name: 'Vue 3' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'Vite' },
  { id: 4, name: 'Seamless Scroll' }
])
</script>

<template>
  <div class="vertical-scroll">
    <VerticalScroll :list="list">
      <template #default="{ data }">
        <div class="item">
          {{ data.name }}
        </div>
      </template>
    </VerticalScroll>
  </div>
</template>

<style scoped>
.vertical-scroll {
  height: 200px;
  overflow: hidden;
}

.item {
  height: 40px;
  line-height: 40px;
}
</style>
```

## Horizontal Scrolling

```vue
<script setup>
import { ref } from 'vue'
import { HorizontalScroll } from 'vue3-seamless-scroll'

const list = ref([
  { id: 1, name: 'Vue 3' },
  { id: 2, name: 'Dashboard' },
  { id: 3, name: 'Data Visualization' },
  { id: 4, name: 'Infinite Scroll' }
])
</script>

<template>
  <div class="horizontal-scroll">
    <HorizontalScroll :list="list">
      <template #default="{ data }">
        <div class="horizontal-item">
          {{ data.name }}
        </div>
      </template>
    </HorizontalScroll>
  </div>
</template>

<style scoped>
.horizontal-scroll {
  width: 100%;
  overflow: hidden;
}

.horizontal-item {
  display: inline-block;
  width: 160px;
}
</style>
```

## Large Dataset / Virtualized Scrolling

`vue3-seamless-scroll` uses virtualized rendering to support large datasets without rendering every item into the DOM at the same time.

For example:

```vue
<script setup>
import { ref } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

const list = ref(
  Array.from({ length: 10000 }, (_, index) => ({
    id: index + 1,
    name: `Large dataset item ${index + 1}`
  }))
)
</script>

<template>
  <div class="scroll-container">
    <Vue3SeamlessScroll
      :list="list"
      :visible-count="20"
    >
      <template #default="{ data }">
        <div class="item">
          {{ data.name }}
        </div>
      </template>
    </Vue3SeamlessScroll>
  </div>
</template>
```

When every item has the same height or width, the component can automatically calculate the number of visible items in many cases.

If your items have a custom layout or dimensions, explicitly setting `visibleCount` is recommended.

## Start and Stop Scrolling

Scrolling can be controlled with `v-model`.

```vue
<script setup>
import { ref } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

const scrolling = ref(true)
const list = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
])
</script>

<template>
  <button @click="scrolling = !scrolling">
    {{ scrolling ? 'Pause' : 'Start' }}
  </button>

  <div class="scroll-container">
    <Vue3SeamlessScroll
      v-model="scrolling"
      :list="list"
    >
      <template #default="{ data }">
        {{ data.name }}
      </template>
    </Vue3SeamlessScroll>
  </div>
</template>
```

## Props

| Prop             | Type      | Default                             | Required | Description                                                                                                                                   |
| ---------------- | --------- | ----------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `list`           | `Array`   | —                                   | Yes      | Data to be rendered in the seamless scrolling list.                                                                                           |
| `visibleCount`   | `Number`  | —                                   | No       | Number of visible items required before scrolling starts. The component may calculate this automatically when item dimensions are consistent. |
| `v-model`        | `Boolean` | `true`                              | No       | Controls whether the scrolling animation is running.                                                                                          |
| `direction`      | `String`  | `"up"`                              | No       | Scrolling direction. Available values: `up`, `down`, `left`, `right`.                                                                         |
| `hover`          | `Boolean` | `false`                             | No       | Enables pause / interaction behavior when the mouse hovers over the component.                                                                |
| `step`           | `Number`  | `0.5`                               | No       | Scrolling step / speed.                                                                                                                       |
| `singleWaitTime` | `Number`  | `1000`                              | No       | Waiting time in milliseconds for single-step scrolling. Only takes effect when `singleLine` is enabled.                                                                                       |
| `delay`          | `Number`  | `0`                                 | No       | Delay before the animation starts.                                                                                                            |
| `ease`           | `String`  | `cubic-bezier(0.03, 0.76, 1, 0.16)` | No       | Animation easing function. Custom cubic-bezier values are supported.                                                                          |
| `wheel`          | `Boolean` | `false`                             | No       | Enables mouse-wheel scrolling when hover behavior is enabled.                                                                                 |
| `singleLine`     | `Boolean` | `false`                             | No       | Enables single-step scrolling: pauses for `singleWaitTime` ms after each item.                                                                                                     |

## Directions

Four scrolling directions are supported:

```vue
<Vue3SeamlessScroll
  :list="list"
  direction="up"
/>
```

Available values:

```text
up
down
left
right
```

## Pause on Hover

```vue
<Vue3SeamlessScroll
  :list="list"
  :hover="true"
/>
```

## Scrolling Speed

Use the `step` prop to adjust scrolling speed:

```vue
<Vue3SeamlessScroll
  :list="list"
  :step="1"
/>
```

The default value is:

```js
0.5
```

## Step-by-Step Scrolling

Single-step scrolling must be enabled with the `singleLine` prop. Use `singleWaitTime` to configure the waiting interval between steps:

```vue
<Vue3SeamlessScroll
  :list="list"
  singleLine
  :single-wait-time="1500"
/>
```

The value is expressed in milliseconds.

## Mouse Wheel

Mouse-wheel interaction can be enabled together with hover behavior:

```vue
<Vue3SeamlessScroll
  :list="list"
  :hover="true"
  :wheel="true"
/>
```

## Component Methods

The component exposes several methods for manipulating its internal scrolling data.

### `add(index, values, cb)`

Adds one or more items.

```js
scrollRef.value.add(
  2,
  [
    { id: 100, name: 'New item' }
  ],
  list => {
    console.log(list)
  }
)
```

Parameters:

| Parameter | Description                                     |
| --------- | ----------------------------------------------- |
| `index`   | Position where the new data should be inserted. |
| `values`  | Array containing the items to insert.           |
| `cb`      | Callback invoked with the updated full list.    |

### `remove(index, num, cb)`

Removes items from the list.

Parameters:

| Parameter | Description                                  |
| --------- | -------------------------------------------- |
| `index`   | Starting index.                              |
| `num`     | Number of items to remove.                   |
| `cb`      | Callback invoked with the updated full list. |

### `update(index, value, cb)`

Updates an item.

Parameters:

| Parameter | Description                                  |
| --------- | -------------------------------------------- |
| `index`   | Index of the item to update.                 |
| `value`   | New value.                                   |
| `cb`      | Callback invoked with the updated full list. |

### `reset()`

Resets the component state.

This is useful when the size of the outer container changes:

```js
scrollRef.value.reset()
```

## Events

### `offset`

Triggered when the internal buffer changes.

It can be used to load additional paginated data for infinite scrolling.

```vue
<Vue3SeamlessScroll
  :list="list"
  @offset="handleOffset"
/>
```

```js
const handleOffset = (bufferSize, targetList) => {
  console.log(bufferSize)
  console.log(targetList)

  // Load the next page here when necessary.
}
```

Arguments:

| Argument     | Description                       |
| ------------ | --------------------------------- |
| `bufferSize` | Current number of buffered items. |
| `targetList` | Original list data.               |

### `count`

Triggered whenever one complete scrolling cycle finishes.

```vue
<Vue3SeamlessScroll
  :list="list"
  @count="handleCount"
/>
```

```js
const handleCount = count => {
  console.log(`Completed ${count} scrolling cycles`)
}
```

## Infinite / Paginated Data

The `offset` event can be used to implement continuously loaded data.

A simplified example:

```vue
<script setup>
import { ref } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

const list = ref([])
const page = ref(1)
const loading = ref(false)

const loadMore = async () => {
  if (loading.value) return

  loading.value = true

  try {
    // Replace this with your API request.
    const newItems = Array.from({ length: 20 }, (_, index) => ({
      id: `${page.value}-${index}`,
      name: `Page ${page.value} - Item ${index + 1}`
    }))

    list.value.push(...newItems)
    page.value += 1
  } finally {
    loading.value = false
  }
}

const handleOffset = async () => {
  await loadMore()
}

loadMore()
</script>

<template>
  <div class="scroll-container">
    <Vue3SeamlessScroll
      :list="list"
      @offset="handleOffset"
    >
      <template #default="{ data }">
        <div class="item">
          {{ data.name }}
        </div>
      </template>
    </Vue3SeamlessScroll>
  </div>
</template>
```

## Important Notes

### Container overflow

The outer container containing the scrolling list must define:

```css
overflow: hidden;
```

For vertical scrolling, the container should also have an explicit height.

For horizontal scrolling, it should normally have an explicit width.

Example:

```css
.scroll-container {
  height: 300px;
  overflow: hidden;
}
```

### Item dimensions

Virtualized scrolling works best when item dimensions are predictable.

If every item has the same height or width, automatic calculation can be used.

For more complex item layouts, setting `visibleCount` explicitly is recommended.

## Typical Use Cases

`vue3-seamless-scroll` can be useful for:

* Monitoring dashboards
* Data visualization screens
* Real-time rankings
* Stock or market tickers
* News tickers
* Announcement lists
* Activity feeds
* Operations dashboards
* Digital signage
* Large continuously scrolling datasets

## TypeScript

The package includes TypeScript declarations and can be directly imported into Vue 3 + TypeScript projects.

```ts
import {
  Vue3SeamlessScroll,
  VerticalScroll,
  HorizontalScroll
} from 'vue3-seamless-scroll'
```

## Documentation and Examples

Repository:

https://github.com/xfy520/vue3-seamless-scroll

npm:

https://www.npmjs.com/package/vue3-seamless-scroll

More examples:

https://doc.wssio.com/opensource/vue3-seamless-scroll/

## Contributing

Contributions are welcome.

If you find a bug or would like to propose an improvement:

1. Search the existing issues first.
2. Create a minimal reproduction when reporting a bug.
3. Clearly describe the expected and actual behavior.
4. Include your Vue version, browser/runtime environment, and package version when relevant.
5. Submit a pull request with tests when possible.

For significant behavior or API changes, opening an issue before implementing the change is recommended.

## Bug Reports

A good bug report should include:

* `vue3-seamless-scroll` version
* Vue version
* Browser and operating system
* Minimal reproduction
* Expected behavior
* Actual behavior
* Relevant configuration
* Screenshots or recordings when useful

Providing a minimal reproduction significantly improves the chances of an issue being diagnosed quickly.

## Maintenance

This project is maintained as an open-source package for the Vue ecosystem.

Current maintenance priorities include:

* Compatibility with current Vue versions
* Browser compatibility
* Performance and virtualized rendering
* Regression testing
* TypeScript support
* Dependency maintenance
* Documentation
* Reliable release automation

## License

[MIT](./LICENSE)

Copyright © vue3-seamless-scroll contributors.
