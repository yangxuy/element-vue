function broadcast(componentName: string, eventName: string, params: any) {
  // @ts-ignore
  this.$children.forEach((child: any) => {
    let name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // @ts-ignore
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

export default {
  methods: {
    dispatch(componentName: string, eventName: string, params: any) {
      // @ts-ignore
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName: string, eventName: string, params: any) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
