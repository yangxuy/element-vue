<template>
    <div class="about">
        <h1>This is an about page</h1>
        <slot v-bind:user="user"></slot>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DemoSlot extends Vue {
  user: string = '111';
}
</script>
