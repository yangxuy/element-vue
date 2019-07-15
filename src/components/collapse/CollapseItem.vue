<template>
    <div class="el-collapse-item">
        <div :class="['el-collapse-item__header',isActive?'active':'']"
             @click="handlerHeaderClick">
            <slot name="title">{{title}}</slot>
            <i :class="['iconfont',isActive?'icon-ai-arrow-down':'icon-arrow-right']"></i>
        </div>
        <collapse-transition>
            <div class="el-collapse-item__wrap" v-show="isActive">
                <div class="el-collapse-item__content">
                    <slot></slot>
                </div>
            </div>
        </collapse-transition>
    </div>
</template>

<script lang=ts>
import CollapseTransition from './CollapseTransition.vue';
import { Component, Vue, Inject, Prop } from 'vue-property-decorator';
import emitter from '@/minx/emitter';

@Component({
  mixins: [emitter],
  components: { CollapseTransition }
})
export default class CollapseItem extends Vue {

  @Prop() name!: string;
  @Prop() title!: string;

  @Inject({ default: '' }) collapse: any;

  get isActive() {
    return this.collapse.value.indexOf(this.name) > -1;
  }

  handlerHeaderClick() {
    // @ts-ignore
    this.dispatch('ElCollapse', 'item-click', this);
  }
}
</script>

<style lang="scss" scoped>
    .el-collapse-item__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 48px;
        line-height: 48px;
        background-color: #fff;
        color: #303133;
        cursor: pointer;
        border-bottom: 1px solid #ebeef5;
        font-size: 13px;
        font-weight: 500;
        transition: border-bottom-color .3s;
    }

    .el-collapse-item__header.active {
        border-bottom-color: transparent;
    }

    .el-collapse-item__wrap {
        will-change: height;
        background-color: #fff;
        overflow: hidden;
        box-sizing: border-box;
        border-bottom: 1px solid #ebeef5;
    }

    .el-collapse-item__content {
        padding-bottom: 25px;
        font-size: 13px;
        color: #303133;
        line-height: 1.7;
    }

    .iconfont {
        font-size: 16px;
        color: #2c3e50;
    }
</style>