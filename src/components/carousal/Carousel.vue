<template>
    <section class="el-carousel"
             :style="getCustomStyle"
             @mouseenter.stop="handleMouseEnter"
             @mouseleave.stop="handleMouseLeave">
        <div>
            <transition name="carousel-arrow-left">
                <button
                        type="button"
                        v-if="arrow !== 'never'"
                        v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
                        @click.stop="throttledArrowLeftClick()"
                        class="el-carousel__arrow el-carousel__arrow--left">
                    &lt;
                </button>
            </transition>
            <transition name="carousel-arrow-right">
                <button
                        type="button"
                        v-if="arrow !== 'never'"
                        v-show="(arrow === 'always' || hover) && (loop || activeIndex < children.length - 1)"
                        @click.stop="throttledArrowRightClick()"
                        class="el-carousel__arrow el-carousel__arrow--right">
                    &gt;
                </button>
            </transition>
            <div ref="el-item-slot" class="el-carousel__container">
                <slot></slot>
            </div>
        </div>
        <div class="indicator-box" v-if="showIndicator">
            <ul class="indicator-ul" @click.stop.prevent>
                <li :class="['indicator-li',index-1===activeIndex?'animationName':'']"
                    v-for="index in children.length"
                    @mouseenter="throttledIndicatorHover(index-1)"
                    @click.stop.prevent="setActiveIndex(index-1)">
                </li>
            </ul>
        </div>
    </section>
</template>

<script lang=ts>
import { throttle } from '@/utils/index';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Swiper extends Vue {
  @Prop({ type: Boolean }) showIndicator!: boolean; // 是否需要指示器
  @Prop({ type: [String, Number] }) height!: string | number;
  @Prop({ type: [String, Number] }) width!: string | number;
  @Prop({ type: Number, default: 2000 }) duration!: number; // 轮播时间
  @Prop({ type: Number, default: 500 }) speed!: number; // 轮播时间
  @Prop() type!: string; // 轮播
  @Prop({ type: Boolean, default: true }) loop!: boolean; // 轮播方式
  @Prop({ type: Boolean, default: false }) autoplay!: boolean; // 轮播方式
  @Prop() arrow!: string; // 左右控制器
  @Prop() trigger!: string; // 事件触发器

  activeIndex: number = 0; // 激活的index
  children: Vue[] = [];
  timer: any = 0;
  hover: boolean = false;
  firstVisible: boolean = true;
  weight: number = 0;
  dom!: CSSStyleDeclaration;
  scale: number = 1;
  throttledIndicatorHover!: () => void;

  get getCustomStyle() {
    let style = {};
    if (this.height) {
      style = Object.assign({}, style, { height: typeof this.height === 'number' ? this.height + 'px' : this.height });
    }
    if (this.width) {
      style = Object.assign({}, style, { width: typeof this.width === 'number' ? this.width + 'px' : this.width });
    }
    return style;
  }

  // 取消定时器，停止轮播
  pauseTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  // 手势控制
  setActiveIndex(index: number) {
    this.activeIndex = index;
    this.playSlides();
  }

  // 自动播放
  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.throttledArrowRightClick();
    }, this.duration);
  }


  // 右控制
  throttledArrowRightClick() {
    if (!this.loop) {
      if (this.activeIndex >= this.children.length - 1) {
        this.activeIndex = this.children.length - 1;
        return;
      }
    }
    this.activeIndex++;
    this.playSlides();
  }

  // 左控制
  throttledArrowLeftClick() {
    if (!this.loop) {
      if (this.activeIndex <= 0) {
        this.activeIndex = 0;
        return;
      }
    }
    this.activeIndex--;
    this.playSlides();
  }

  // slide
  playSlides() {
    this.setTransform(this.activeIndex, this.speed);
    this.loop && setTimeout(() => {
      if (this.activeIndex >= this.children.length) {
        this.activeIndex = this.loop ? 0 : this.children.length;
        this.setTransform(this.activeIndex, 0);
      }
      if (this.activeIndex < 0) {
        this.activeIndex = this.loop ? this.children.length - 1 : 0;
        this.setTransform(this.activeIndex, 0);
      }
    }, this.speed);
  }

  // 移动函数
  setTransform(num: number, speed: number) {
    this.dom.transition = `all ${speed}ms`;
    num = this.loop ? num + 1 : num;
    this.dom.transform = `translate3d(${(num) * this.weight * -1}px, 0px, 0px)`;
  }

  handleMouseEnter() {
    this.hover = true;
    this.pauseTimer();
  }

  handleMouseLeave() {
    this.hover = false;
    this.autoplay ? this.startTimer() : this.pauseTimer();
  }

  // dom更新
  updateItems() {
    this.children = this.$children.filter((child: Vue) => child.$options.name === 'CarouselItem.vue');
    if (this.children.length && this.firstVisible) {
      this.firstVisible = false;
      this.$nextTick(() => {
        const oBox = this.$refs['el-item-slot'] as HTMLElement;
        const cloneDom1 = this.children[0].$el.cloneNode(true); //向最后append
        const cloneDom2 = this.children[this.children.length - 1].$el.cloneNode(true); //向最前append
        this.weight = oBox.offsetWidth;
        this.dom = oBox.style;
        if (this.loop) { // 循环播放
          oBox.insertBefore(cloneDom2, this.children[0].$el);
          oBox.appendChild(cloneDom1);
          this.setTransform(this.activeIndex, 0);
        }
      });
    }
  }

  handleIndicatorHover(index: number) {
    if (this.trigger === 'hover' && index !== this.activeIndex) {
      this.activeIndex = index;
      this.playSlides();
    }
  }

  created() {
    this.throttledIndicatorHover = throttle(1000, (index: number) => {
      this.handleIndicatorHover(index);
    });
  }

  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      this.autoplay ? this.startTimer() : this.pauseTimer();
    });
  }

  beforeDestroy() {
    this.pauseTimer();
  }
}
</script>

<style lang="scss" scoped>
    .el-carousel {
        width: 100%;
        overflow-x: hidden;
        position: relative;
    }

    .el-carousel__container {
        position: relative;
        display: flex;
    }

    .indicator-box {
        position: absolute;
        width: 100%;
        bottom: 0px;
    }

    .indicator-ul {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
    }

    .indicator-li {
        width: 40px;
        display: inline-block;
        list-style: none;
        height: 4px;
        margin: 0 10px;
        background: rgba(0, 0, 0, 0.5);
        position: relative;
        cursor: pointer;
    }

    .default-indicator {
        position: absolute;
        top: 0;
        bottom: 0;
        display: inline-block;
        background: white;
    }

    .el-carousel__arrow {
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        height: 36px;
        width: 36px;
        cursor: pointer;
        transition: .3s;
        border-radius: 50%;
        background-color: rgba(31, 45, 61, .11);
        color: #fff;
        position: absolute;
        top: 50%;
        z-index: 10;
        transform: translateY(-50%);
        text-align: center;
        font-size: 12px;

        &:hover {
            background-color: rgba(31, 45, 61, .23);
        }
    }

    .el-carousel__arrow--left {
        left: 16px;
    }

    .el-carousel__arrow--right {
        right: 16px;
    }

    /*动画*/
    .carousel-arrow-left-enter, .carousel-arrow-left-leave-to {
        left: 0;
    }

    .carousel-arrow-left-enter-active, .carousel-arrow-left-leave-active {
        transition: left .1s;
    }

    .carousel-arrow-right-enter, .carousel-arrow-right-leave-to {
        right: 0;
    }

    .carousel-arrow-right-enter-active, .carousel-arrow-right-leave-active {
        transition: right .1s;
    }


    .animationName {
        background-color: black;
    }
</style>
