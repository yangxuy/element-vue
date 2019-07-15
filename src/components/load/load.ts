import Vue from 'vue';
import Loading from './Loading.vue';
import { addClass, getStyle } from '@/utils/dom';
import { DirectiveBinding } from 'vue/types/options';

const toggleLoading = (el: any, binding: DirectiveBinding) => {
  Vue.nextTick(() => {
    if (binding.value) {
      el.instance.visible = true;
    } else {
      el.instance.visible = false;
    }
  });
};

const loading = () => {
  Vue.directive('loading', {
    bind: (el: any, binding, vnode) => {
      const Mask = Vue.extend(Loading);
      const textExr = el.getAttribute('loading-text');
      const spinnerExr = el.getAttribute('loading-spinner');
      const backgroundExr = el.getAttribute('loading-background');
      const customClassExr = el.getAttribute('loading-custom-class');
      const instance = new Mask({
        el: document.createElement('div'),
        data: {
          visible: false,
          fullscreen: !!binding.modifiers.fullscreen,
          text: textExr,
          spinner: spinnerExr,
          background: backgroundExr,
          customClass: customClassExr
        }
      });
      console.log(textExr);
      el.appendChild(instance.$el);
      el.style.position = 'relative';
      el.instance = instance;
      toggleLoading(el, binding);
    },
    update: (el: any, binding) => {
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },
    unbind: (el: any) => {
      el.instance && el.instance.$destroy();
    }
  });
};

export default {
  install: loading
};