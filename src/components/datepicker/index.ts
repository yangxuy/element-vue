import datepick from './DatePicker.vue';

export default {
  install: (vue: any) => {
    vue.component('elDatePick', datepick);
  }
};