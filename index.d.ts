type OptionsType = {
  modelValue?: boolean;
  list: Array<unknown>;
  step?: number;
  hover?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  singleWaitTime?: number;
  delay?: number;
  ease?: string;
  wheel?: boolean;
  visibleCount?: number;
  singleLine?: boolean;
}

declare module 'vue3-seamless-scroll' {
  export const Vue3SeamlessScroll: import('vue').DefineComponent < OptionsType, {}, any >
  export const VerticalScroll: import('vue').DefineComponent < OptionsType, {}, any >
  export const HorizontalScroll: import('vue').DefineComponent < OptionsType, {}, any >

  const install: (app: import('vue').App, options?: {
    name?: string
  }) => void;
  export default install;
}
