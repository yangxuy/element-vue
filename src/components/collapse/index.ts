import Collapse from './Collapse.vue';
import CollapseItem from './CollapseItem.vue';

export default {
  install: (vue: any) => {
    vue.component('elCollapse', Collapse);
    vue.component('elCollapseItem', CollapseItem);
  }
};