import VerticalScroll from './VerticalScroll.vue';
import HorizontalScroll from './HorizontalScroll.vue';
import Vue3SeamlessScroll from './Vue3SeamlessScroll.vue';

const install = function (app, options = {}) {
  app.component(options.name || Vue3SeamlessScroll.name, Vue3SeamlessScroll);
}

export default function (app) {
  app.use(install)
}

export {
  VerticalScroll,
  HorizontalScroll,
  Vue3SeamlessScroll
}
