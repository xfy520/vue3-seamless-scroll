import { ComputedGetter, WritableComputedOptions } from 'vue';

type OptionsType = {
  modelValue?: ComputedGetter<boolean>;
  list: ComputedGetter<Array<unknown>>;
  step?: ComputedGetter<number>;
  hover?: ComputedGetter<boolean>;
  direction?: ComputedGetter<"up" | "down" | "left" | "right">;
  singleWaitTime?: ComputedGetter<number>;
  ease?: ComputedGetter<"ease-in" | "linear" | "ease" | "ease-out" | "ease-in-out" | string>;
  wheel?: ComputedGetter<boolean>;
  visibleCount?: ComputedGetter<number>;
  singleLine?: ComputedGetter<boolean>;
}

declare module 'vue3-seamless-scroll' {
  export const Vue3SeamlessScroll: import('vue').DefineComponent < OptionsType, OptionsType, OptionsType, OptionsType, OptionsType,
    OptionsType, OptionsType, OptionsType, string, OptionsType, OptionsType, OptionsType >

  const install: (app: import('vue').App, options: {
    name: string
  }) => unknown;
  export default install;
}
