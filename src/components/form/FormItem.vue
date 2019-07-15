<template>
    <div class="el-form-item">
        <label class="el-form-item__label" :style="labelStyle">
            <slot name="label">{{label}}</slot>
            <transition v-if="validateMessage">
                <div class="el-form-item__error">
                    {{validateMessage}}
                </div>
            </transition>
        </label>
        <div class="el-form-item__content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang=ts>
import { Component, Vue, Provide, Prop, Inject } from 'vue-property-decorator';
import emitter from '@/minx/emitter';

@Component({
  name: 'FormItem',
  mixins: [emitter]
})
export default class FormItem extends Vue {
  @Provide()
  elFromItem = this;

  @Inject({ default: '' }) elFrom: any;
  @Prop() label!: string;
  @Prop() rule!: Rule[];
  @Prop() prop!: string;
  @Prop() error!: string;
  @Prop() labelWidth!: string;

  validateMessage: string = '';

  get formItemValue() {
    // const itemValue: any = {};
    // if (this.prop) {
    //   itemValue[this.prop] = this.elFrom.model[this.prop];
    // }
    // return itemValue;
    return this.elFrom.model[this.prop];
  }

  get labelStyle() {
    const ret: any = {};
    const labelWidth = this.labelWidth || this.elFrom.labelWidth;
    if (labelWidth) {
      ret.width = labelWidth;
    }
    return ret;
  }

  validate() {
    this.rule.forEach(v => {
      this.validateMessage = '';
      v.validator(this.formItemValue, (err: Error) => {
        if (err) {
          this.validateMessage = err.message;
          return err;
        }
      });
    });
  }

  mounted() {
    if (this.prop) {
      // @ts-ignore
      this.dispatch('Form', 'form.addField', [this]);
    }
  }

  beforeDestroy() {
    // @ts-ignore
    this.dispatch('Form', 'el.form.rem', [this]);
  }
}
</script>

<style scoped>
    .el-form-item {
        position: relative;
    }

    .el-form-item__label {
        display: inline-block;
    }

    .el-form-item__content {

    }

    .el-form-item__error {
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 0;
        right: 0;
    }
</style>