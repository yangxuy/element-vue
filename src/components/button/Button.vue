<template>
    <button class="el-button" :disabled="disabled" @click="handleClick"
            :class="[`el-button__${type}`,{'is-loading': loading, 'is-circle': circle}]">
        <slot name="loading" v-if="loading">
            <div class="loading-i"><i class="iconfont icon-loading"></i></div>
        </slot>
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script lang=ts>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() loading!: boolean;
  @Prop() type!: string;
  @Prop() disabled!: boolean;
  @Prop() circle!: boolean;

  handleClick(evt: Event) {
    this.$emit('click', evt);
  }
}
</script>

<style lang="scss" scoped>
    @import "../style/animation.scss";

    .el-button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }

    .is-loading {
        position: relative;
        pointer-events: none;

        &:before {
            pointer-events: none;
            content: "";
            position: absolute;
            left: -1px;
            top: -1px;
            right: -1px;
            bottom: -1px;
            border-radius: inherit;
            background-color: hsla(0, 0%, 100%, .35);
        }
    }

    .el-button.is-circle {
        border-radius: 50%;
        padding: 12px;
    }

    .el-button__primary {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;

        &:hover {
            background: #66b1ff;
            border-color: #66b1ff;
            color: #fff;
        }
    }

    .el-button--success {
        color: #fff;
        background-color: #67c23a;
        border-color: #67c23a;

        &:hover {
            background: #85ce61;
            border-color: #85ce61;
            color: #fff;
        }
    }

    .el-button--info {
        color: #fff;
        background-color: #909399;
        border-color: #909399;

        &:hover {
            background: #a6a9ad;
            border-color: #a6a9ad;
            color: #fff;
        }
    }

    .el-button--warning {
        color: #fff;
        background-color: #e6a23c;
        border-color: #e6a23c;

        &:hover {
            background: #ebb563;
            border-color: #ebb563;
            color: #fff;
        }
    }

    .el-button--danger {
        color: #fff;
        background-color: #f56c6c;
        border-color: #f56c6c;

        &:hover {
            background: #f78989;
            border-color: #f78989;
            color: #fff;
        }
    }

    .loading-i {
        display: inline-block;
        font-size: 20px;
        animation: 5s rote linear infinite;
    }
</style>