import Form from './Form.vue';
import FormItem from './FormItem.vue';

export default {
  install: (vue: any) => {
    vue.component('elForm', Form);
    vue.component('elFormItem', FormItem);
  }
};