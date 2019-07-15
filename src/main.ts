import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './common.scss';
import './assets/iconfont.css';
import message from '@/components/message/message';
import loading from '@/components/load/load';
import ElInput from '@/components/input/index';
import ElButton from '@/components/button/index';
import ElRadio from '@/components/radio/index';
import ElForm from '@/components/form/index';
import elCarousel from '@/components/carousal/index';
import elCollapse from '@/components/collapse/index';
import elLayOut from '@/components/layout/index';
import elDate from '@/components/datepicker/index';

Vue.config.productionTip = false;

Vue.use(message);
Vue.use(loading);
Vue.use(ElInput);
Vue.use(ElButton);
Vue.use(ElRadio);
Vue.use(ElForm);
Vue.use(elCarousel);
Vue.use(elCollapse);
Vue.use(elLayOut);
Vue.use(elDate);
declare module 'vue/types/vue' {
  interface Vue {
    $message: any;
  }
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
