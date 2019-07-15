<template>
    <section class="el-collapse">
        <slot></slot>
    </section>
</template>

<script lang=ts>
import { Component, Vue, Prop, Provide } from 'vue-property-decorator';

@Component({
  name: 'ElCollapse'
})
export default class Collapse extends Vue {
  @Prop() value!: any;
  @Prop({ type: Boolean, default: false }) accordion!: boolean;

  @Provide()
  collapse = this;

  emitEvent(v: any) {
    this.$emit('input', v);
  }

  handlerItemClick(item: any) {
    if (this.accordion) {
      if (this.value.indexOf(item.name) > -1) {
        this.$emit('input', []);
      } else {
        this.$emit('input', [].concat(item.name));
      }
    } else {
      let index = this.value.indexOf(item.name);
      let arr = [];
      if (index > -1) {
        arr = this.value.slice(0, index).concat(this.value.slice(index + 1));
      } else {
        arr = [].concat(this.value, item.name);
      }
      this.emitEvent(arr);
    }
  }

  created() {
    this.$on('item-click', this.handlerItemClick);
  }
}
</script>

<style scoped>
    .el-collapse {
        border-top: 1px solid #ebeef5;
        /*border-bottom: 1px solid #ebeef5;*/
    }
</style>