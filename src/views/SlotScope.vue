<template>
    <div>
        <h6>测试slot-scope</h6>
        <slot v-bind:user="user" name="header"></slot>
        <slot v-bind:user="user" name="main"></slot>
    </div>
</template>

<script lang=ts>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SlotScope extends Vue {
  user: string = '111';
}
</script>

<style scoped>

</style>
