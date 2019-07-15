import ElRadio from './Radio.vue';
import ElRadioGroup from './RadioGroup.vue';

/* istanbul ignore next */
export default {
  install: (Vue: any) => {
    Vue.component('elRadio', ElRadio);
    Vue.component('elRadioGroup', ElRadioGroup);
  }
};