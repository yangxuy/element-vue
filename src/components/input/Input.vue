<template>
    <div class="el-input"
         @mouseenter="hovering = true"
         @mouseleave="hovering = false">
        <template v-if="type !=='textarea'">
            <!-- 前置元素 -->
            <div class="el-input__prepend" v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </div>
            <input
                    :tabindex="tabindex"
                    class="el-input__inner"
                    v-bind="$attrs"
                    :disabled="disable"
                    :type="type"
                    ref="input"
                    @compositionstart="handleCompositionStart"
                    @compositionend="handleCompositionEnd"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
            >
            <div class="el-input__append" v-if="$slots.append">
                <slot name="append"></slot>
            </div>
        </template>
        <textarea
                v-else
                :tabindex="tabindex"
                class="el-textarea__inner"
                @compositionstart="handleCompositionStart"
                @compositionend="handleCompositionEnd"
                @input="handleInput"
                ref="textarea"
                v-bind="$attrs"
                :disabled="disable"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange">
        </textarea>
    </div>
</template>

<script lang=ts>
type validStatus = 'validating' | 'success' | 'error'
import emitter from '@/minx/emitter';
import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'elInput',
  mixins: [emitter]
})
export default class Input extends Vue {

  @Inject({ default: '' }) elForm: any;
  @Inject({ default: '' }) elFromItem: any;

  @Prop() value!: string | number;
  @Prop() tabindex!: string;
  @Prop() disable!: boolean;
  @Prop() validateEvent!: boolean;
  @Prop() type!: string;

  hovering: boolean = false;
  focused: boolean = false;
  isComposing: boolean = false;

  get nativeInputValue(): string {
    return this.value === null || this.value === undefined ? '' : String(this.value);
  }

  @Watch('value')
  handlerValueChange(val: any) {
    if (this.validateEvent) {
      // @ts-ignore
      this.dispatch('ElFormItem', 'el.form.change', [val]);
    }
    this.setNativeInputValue();
  }

  // 表单验证相关
  get validateState(): validStatus {
    return this.elFromItem ? this.elFromItem.validateState : '';
  }

  get validateIcon() {
    return {
      validating: 'el-icon-loading',
      success: 'el-icon-circle-check',
      error: 'el-icon-circle-close'
    }[this.validateState];
  }

  get needStatusIcon() {
    return this.elForm ? this.elForm.statusIcon : false;
  }

  handleCompositionStart() {
    this.isComposing = true;
  }

  handleCompositionEnd(event: CompositionEvent) {
    this.isComposing = false;
    this.handleInput(event);
  }

  handleInput(event: any) {
    // should not emit input during composition
    // see: https://github.com/ElemeFE/element/issues/10516
    if (this.isComposing) return;

    // hack for https://github.com/ElemeFE/element/issues/8548
    // should remove the following line when we don't support IE
    if (event.target.value === this.nativeInputValue) return;

    this.$emit('input', event.target.value);
    this.$emit('change', event.target.value);
    // ensure native input value is controlled
    // see: https://github.com/ElemeFE/element/issues/12850
    this.$nextTick(this.setNativeInputValue);
  }

  setNativeInputValue() {
    const input = this.getInput();
    if (!input) return;
    if (input.value === this.nativeInputValue) return;
    input.value = this.nativeInputValue;
  }

  getInput(): HTMLInputElement {
    return (this.$refs.input || this.$refs.textarea) as HTMLInputElement;
  }

  handleFocus(event: FocusEvent) {
    this.focused = true;
    this.$emit('focus', event);
  }

  handleBlur(event: FocusEvent) {
    this.focused = false;
    this.$emit('blur', event);
    if (this.validateEvent) {
      // @ts-ignore
      this.dispatch('ElFormItem', 'el.form.blur', [this.value]);
    }
  }

  handleChange(event: any) {
    this.$emit('input', event.target.value);
    this.$emit('change', event.target.value);
  }

  mounted() {
    this.setNativeInputValue();
  }
}
</script>

<style lang="scss" scoped>
    .el-input {
        position: relative;
        /*display: inline-block;*/
    }

    .el-input__prepend {
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
    }

    .el-input__append {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
    }

    .el-input__inner {
        background-color: #fff;
        background-image: none;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 35px;
        line-height: 35px;
        outline: none;
        padding: 0 25px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;

        &:focus {
            outline: none;
            border-color: #409eff;
        }
    }

    /*// #409eff*/
</style>