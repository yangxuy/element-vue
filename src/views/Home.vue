<template>
    <div class="home">
        <el-form style="width: 500px;padding: 0 12px" ref="ruledom" :model="formData">
            <el-form-item label="测试" labelWidth="100px" prop="input" :rule="[rule.number]">
                <el-input v-model="formData.input"></el-input>
            </el-form-item>
            <el-form-item label="测试radio" labelWidth="100px" prop="radio" :rule="[rule.NotEmpty]">
                <el-radio-group v-model="formData.radio">
                    <el-radio :disabled="true" label="测试radio1"></el-radio>
                    <el-radio label="测试label2"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlertest">确定</el-button>
            </el-form-item>
        </el-form>
        <elDatePick v-model="str"></elDatePick>
        <SlotScope>
            <template #header="{user}">{{user}}</template>
            <template slot-scope="{user}" slot="main">{{user}}</template>
        </SlotScope>
    </div>
</template>

<script lang="ts">
import rule from '@/utils/rules';
import { Component, Vue, Provide } from 'vue-property-decorator';
import ElCollapse from '@/components/collapse/Collapse.vue';
import ElRow from '@/components/layout/Row.vue';
import SlotScope from './SlotScope.vue';

@Component({
  components: { ElRow, ElCollapse, SlotScope }
})
export default class Home extends Vue {
  rule: Rules = rule;
  formData: any = {
    input: '',
    radio: ''
  };
  str: string = '';
  activeName = [];

  handlertest() {
    this.$message.success({ message: 'xxx' });
    // this.$message({
    //   type: 'success',
    //   message: 'xxx'
    // });
    // const o = this.$refs['ruledom'] as any;
    // o.validate();
  }
}
</script>
<style>
    .home {
        margin-top: 50px;
    }

    .center {
        text-align: center;
        line-height: 300px;
    }
</style>
