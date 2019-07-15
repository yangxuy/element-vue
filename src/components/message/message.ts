import Vue from 'vue';
import MessageBox from './MessageBox.vue';

const message = (options: MessageOptions) => {
  const defaults: MessageOptions = {
    type: '',
    visible: false,
    message: '',
    duration: 2000
  };
  options = Object.assign({}, defaults, options);
  const messageConstrutor = Vue.extend(MessageBox);
  const instance = new messageConstrutor({
    data: options
  }).$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  return instance;
};

export default {
  install: (vue: any) => {
    vue.prototype.$message = message; // 将message组件暴露出去，并挂载在Vue的prototype上
  }
};