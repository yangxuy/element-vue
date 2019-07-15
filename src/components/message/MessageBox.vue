<template>
    <transition class="message-box">
        <div v-bind="$attrs" :class="['el-message',`el-message-${type}`]"
             v-show="visible">
            <slot>
                <p>{{message}}</p>
            </slot>
        </div>
    </transition>
</template>

<script lang=ts>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MessageBox extends Vue {
  visible: boolean = false;
  type: MessageType = '';
  message: string = '';
  duration: number = 2000;
  timer: Number = 0;
  closed: boolean = false;

  startTimer() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.visible = false;
        }
      }, this.duration);
    }
  }

  close() {
    this.closed = true;
  }

  keydown(e: KeyboardEvent) {
    if (e.keyCode === 27) { // esc关闭消息
      if (!this.closed) {
        this.close();
      }
    }
  }

  mounted() {
    this.startTimer();
    document.addEventListener('keydown', this.keydown);
  }

  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  }
}
</script>

<style lang="scss" scoped>
    .el-message {
        position: fixed;
        top: 30px;
        left: 50%;
        padding: 8px 15px;
        transform: translateX(-50%);
        border-radius: 4px;
    }

    .el-message-warn {
        background-color: #fdf6ec;
        border-color: #faecd8;
        color: #e6a23c;
    }

    .el-message-error {
        background-color: #fef0f0;
        border-color: #fde2e2;
        color: #f56c6c;
    }

    .el-message-success {
        background-color: #f0f9eb;
        border-color: #e1f3d8;
        color: #67c23a;
    }

    .el-message-info {
        background-color: #edf2fc;
        border: 1px solid #ebeef5;
        color: #909399;
    }
</style>