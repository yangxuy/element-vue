<template>
    <transition name="el-loading">
        <div v-show="visible"
             :style="{ backgroundColor: background || '' }"
             :class="['loading',fullscreen?'loading-full':'']">
            <i class="iconfont icon-loading loading-i"></i>
            <div class="el-loading-text">
                <i v-if="spinner" :class="spinner"></i>
                <p v-if="text" class="el-loading-text">{{ text }}</p>
            </div>
        </div>
    </transition>
</template>

<script lang=ts>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  visible: boolean = false;
  fullscreen: boolean = true;
  text: string = '';
  spinner: string = '';
  background: string = '';
  customClass: string = '';
}
</script>

<style scoped>
    @keyframes rote {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .loading {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loading-full {
        position: fixed;
    }

    .el-loading-text {
        color: white;
    }

    .loading-i {
        font-size: 46px;
        animation: 5s rote linear infinite;
    }
</style>