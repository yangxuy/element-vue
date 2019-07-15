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
        <!--        <el-carousel showIndicator autoplay trigger="hover" arrow="always" height="300px" width="400px">-->
        <!--            <el-carousel-item>-->
        <!--                <div class="center" style="background-color: gray">1</div>-->
        <!--            </el-carousel-item>-->
        <!--            <el-carousel-item>-->
        <!--                <div class="center" style="background-color: #2c3e50">2</div>-->
        <!--            </el-carousel-item>-->
        <!--            <el-carousel-item>-->
        <!--                <div class="center" style="background-color: yellowgreen">3</div>-->
        <!--            </el-carousel-item>-->
        <!--        </el-carousel>-->
        <!--        <el-collapse accordion v-model="activeName">-->
        <!--            <el-collapse-item title="学习" name="1">-->
        <!--                我要好好学习-->
        <!--            </el-collapse-item>-->
        <!--            <el-collapse-item title="学习2" name="2">-->
        <!--                我要好好学习22-->
        <!--            </el-collapse-item>-->
        <!--        </el-collapse>-->
        <!--        <el-row :gutter="30">-->
        <!--            <el-col :span="1">-->
        <!--                <div style="background: #2c3e50">1</div>-->
        <!--            </el-col>-->
        <!--            <el-col :span="1">-->
        <!--                <div style="background: gray">2</div>-->
        <!--            </el-col>-->
        <!--            <el-col :span="1">-->
        <!--                <div style="background: gray">3</div>-->
        <!--            </el-col>-->
        <!--        </el-row>-->
        <elDatePick v-model="str"></elDatePick>
    </div>
</template>

<script lang="ts">
import rule from '@/utils/rules';
import { Component, Vue, Provide } from 'vue-property-decorator';
import ElCollapse from '@/components/collapse/Collapse.vue';
import ElRow from '@/components/layout/Row.vue';

@Component({
  components: { ElRow, ElCollapse }
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
    const o = this.$refs['ruledom'] as any;
    o.validate();
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