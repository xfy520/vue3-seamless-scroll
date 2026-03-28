type OptionsType = {
  modelValue?: boolean;
  list: Array<unknown>;
  step?: number;
  hover?: boolean;
  direction?: "up" | "down" | "left" | "right";
  singleWaitTime?: number;
  ease?: "ease-in" | "linear" | "ease" | "ease-out" | "ease-in-out" | string;
  wheel?: boolean;
  visibleCount?: number;
  singleLine?: boolean;
}

declare module 'vue3-seamless-scroll' {
  export const Vue3SeamlessScroll: import('vue').DefineComponent < OptionsType, OptionsType, OptionsType, OptionsType, OptionsType,
    OptionsType, OptionsType, OptionsType, string, OptionsType, OptionsType, OptionsType >

  const install: (app: import('vue').App, options: {
    name: string
  }) => unknown;
  export default install;
}
