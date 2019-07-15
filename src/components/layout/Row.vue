<script lang=ts>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CreateElement } from 'vue';

@Component({
  name: 'elRow'
})
export default class Row extends Vue {

  @Prop({ type: String, default: 'div' }) tag!: string;
  @Prop({ type: Number, default: 0 }) gutter!: number;

  get style() {
    let ret: any = {};
    if (this.gutter) {
      ret.marginLeft = `-${this.gutter / 2}px`;
      ret.marginRight = ret.marginLeft;
    }
    return ret;
  }

  render(h: CreateElement) {
    return h(this.tag, {
      class: ['el-row'],
      style: this.style
    }, this.$slots.default);
  }
}
</script>

<style scoped>
    .el-row {
        display: flex;
        flex-wrap:wrap;
    }
</style>