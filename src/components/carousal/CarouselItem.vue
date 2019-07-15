<template>
    <div class="el-carousel__item">
        <slot/>
    </div>
</template>

<script lang=ts>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'CarouselItem.vue'
})
export default class Slide extends Vue {
  created() {
    if (this.$parent) {
      // @ts-ignore
      this.$parent.updateItems();
    }
  }
}
</script>

<style scoped>
    .el-carousel__item {
        width: 100%;
        flex-shrink: 0;
    }
</style>
