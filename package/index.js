import VerticalScroll from './VerticalScroll.vue';
import HorizontalScroll from './HorizontalScroll.vue';

const install = function (app, options = {}) {
  app.component(options.name || VerticalScroll.name, VerticalScroll);
  app.component(options.name || HorizontalScroll.name, HorizontalScroll);
}

export default function (app) {
  app.use(install)
}

export {
  VerticalScroll,
  HorizontalScroll
}
