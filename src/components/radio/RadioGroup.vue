<template>
    <div class="el-radio-group">
        <slot></slot>
    </div>
</template>

<script lang=ts>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'radioGroup'
})
export default class RadioGroup extends Vue {
  @Prop() value!: any;
  @Prop() disabled!: boolean;

  created() {
    this.$on('handlerChange', (value: any) => {
      this.$emit('input', value);
    });
  }
}
</script>

<style scoped>

</style>