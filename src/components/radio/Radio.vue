<template>
    <label :class="['el-radio', { 'is-checked': model === label ,'is-disabled':isDisabled}]">
       <span :class="['el-radio__input',{ 'is-checked': model === label }]">
           <span class="el-radio__inner"></span>
           <input type="radio"
                  :value="label"
                  v-model="model"
                  :disabled="isDisabled"
                  class="el-radio__original"/>
       </span>
        <span class="el-radio__label">
          <slot></slot>
          <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script lang=ts>
import emitter from '@/minx/emitter';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  mixins: [emitter]
})
export default class Radio extends Vue {
  @Prop() value!: string;
  @Prop() label!: string;
  @Prop() disabled!: boolean;

  radioGroup: any = null;

  get model() {
    return this.isGroup ? this.radioGroup.value : this.value;
  }

  set model(val: string) {
    if (this.isGroup) {
      // @ts-ignore
      this.isGroup && this.dispatch('radioGroup', 'handlerChange', val);
    } else {
      this.$emit('input', val);
    }
  }

  get isGroup() {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options.name !== 'radioGroup') {
        parent = parent.$parent;
      } else {
        this.radioGroup = parent;
        return true;
      }
    }
    return false;
  }

  get isDisabled() {
    return this.isGroup ? this.radioGroup.disabled || this.disabled : this.disabled;
  }
}
</script>

<style lang="scss" scoped>
    .el-radio {
        color: #606266;
        font-weight: 500;
        line-height: 1;
        position: relative;
        cursor: pointer;
        display: inline-block;
        white-space: nowrap;
        outline: none;
        font-size: 14px;
        margin-right: 30px;
    }

    .el-radio.is-disabled {
        cursor: default;
    }

    .el-radio__input {
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        display: inline-block;
        line-height: 1;
        position: relative;
        vertical-align: middle;
    }


    .el-radio__inner {
        border: 1px solid #dcdfe6;
        border-radius: 100%;
        width: 14px;
        height: 14px;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;

        &:after {
            width: 4px;
            height: 4px;
            border-radius: 100%;
            background-color: #fff;
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .el-radio__input.is-disabled.is-checked .el-radio__inner:after {
        background-color: #c0c4cc;
    }

    .el-radio__input.is-checked .el-radio__inner {
        border-color: #409eff;
        background: #409eff;
    }

    .el-radio__input.is-disabled + span.el-radio__label {
        color: #c0c4cc;
        cursor: not-allowed;
    }

    .el-radio__input.is-disabled.is-checked .el-radio__inner {
        background-color: #f5f7fa;
        border-color: #e4e7ed;
    }

    .el-radio__original {
        opacity: 0;
        outline: none;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0;
    }

    .el-radio__label {
        font-size: 14px;
        padding-left: 10px;
    }

    .el-radio__input.is-checked + .el-radio__label {
        color: #409eff;
    }
</style>