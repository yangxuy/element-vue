import Row from './Row.vue';
import Col from './Col.vue';

export default {
  install: (vue: any) => {
    vue.component('elRow', Row);
    vue.component('elCol', Col);
  }
};