<template>
    <div class="el-form">
        <slot></slot>
    </div>
</template>

<script lang=ts>
import { Component, Vue, Provide, Prop } from 'vue-property-decorator';

@Component({
  name: 'Form'
})
export default class Form extends Vue {
  @Provide()
  elFrom = this;

  @Prop() model!: object;
  @Prop() labelWidth!: string;

  fields: Vue[] = [];

  validate() {
    if (!this.model) return false;
    let valid = true;
    this.fields.forEach(v => {
      // @ts-ignore
      v.validate();
    });
  }

  created() {
    this.$on('form.addField', (field: Vue) => {
      this.fields.push(field);
    });
    this.$on('el.form.rem', (field: Vue) => {
      this.fields.splice(this.fields.indexOf(field), 1);
    });
  }
}
</script>

<style scoped>

</style>