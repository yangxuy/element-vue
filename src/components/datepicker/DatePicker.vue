<template>
    <div class="el-date-picker">
        <el-input class="el-date-picker__input" :value="value" @change="handlerChangeValue"
                  @click.native="handlerContrlShow" :readonly="true">
            <i class="iconfont icon-xingxing" slot="prepend"></i>
        </el-input>
        <CollapseTransition>
            <div class="el-date-picker__timer" v-show="show">
                <div class="el-date-picker__timer__header">
                    <span class="el-date-picker__timer__header__left" @click="handlerMonthAdd(-1)">&lt;</span>
                    <span class="el-date-picker__timer__header__text">{{select.year+'-'+select.month+'-'+select.date}}</span>
                    <span class="el-date-picker__timer__header__right" @click="handlerMonthAdd(1)">&gt;</span>
                </div>
                <div class="el-date-picker__timer__content">
                    <ul>
                        <li>
                            <span>日</span>
                            <span>一</span>
                            <span>二</span>
                            <span>三</span>
                            <span>四</span>
                            <span>五</span>
                            <span>六</span>
                        </li>
                        <li v-for="cel in row">
                            <span v-for="item in cel"
                                  :class="[current.month===select.month&&
                                  current.date===select.date&&
                                  current.date===item.text&&
                                  !item.flag ?'active-pick':'']"
                                  @click="handlerPick(item)">{{item.text}}</span>
                        </li>
                    </ul>
                </div>
                <div class="el-date-picker__bottom">
                    <span class="el-date-picker__cancel" @click="transformNew">此刻</span>
                    <span class="el-date-picker__submit" @click="handlerSubmit">确定</span>
                </div>
            </div>
        </CollapseTransition>
    </div>
</template>

<script lang=ts>
interface SelectDate {
  year: number;
  month: number;
  date: number;
  day: number;
}

import CollapseTransition from '../collapse/CollapseTransition.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: { CollapseTransition }
})
export default class DatePicker extends Vue {
  @Prop() value!: string;
  @Prop({ default: true }) readonly!: boolean;
  show: boolean = false;
  select: SelectDate = {
    year: 0,
    month: 0,
    date: 0,
    day: 0
  };
  current: SelectDate = {
    year: 0,
    month: 0,
    date: 0,
    day: 0
  };
  currentMonthFirstDay: number = 0;
  currentMonthEndDate: number = 0;
  currentMonthEndDay: number = 0;
  lastMonthEndDate: number = 0;
  inputValue: string = '';
  row: any[][] = [];

  handlerContrlShow() {
    this.show = !this.show;
  }

  /**
   * 将时间转化为具体的 年、月、日、星期
   **/
  transform(time?: any) {
    const date = !!time ? new Date(time) : new Date();
    this.select.year = date.getFullYear();
    this.select.month = date.getMonth() + 1;
    this.select.date = date.getDate(); // 几号
    this.select.day = date.getDay();  // 星期几
    this.currentMonthFirstDay =
      new Date(this.select.year, this.select.month - 1, 1, 0).getDay();
    this.currentMonthEndDate =
      new Date(this.select.year, this.select.month, 0).getDate();
    this.currentMonthEndDay =
      new Date(this.select.year, this.select.month, 0).getDay();
    this.getDateList();
    if (!time) {
      this.complete();
    }
  }

  /**
   * 计算出日历列表，二维数组
   * 第一层为星期，第二层为每星期对应的日期
   * 第一步 计算第一行
   * 第二布 计算后面几行
   */
  getDateList() {
    this.row = [];
    // 计算第一行
    if (this.select.month === 1) {
      const pre = new Date(this.select.year - 1, 12, 0);
      this.lastMonthEndDate = pre.getDate();
    } else {
      const pre = new Date(this.select.year, this.select.month - 1, 0);
      this.lastMonthEndDate = pre.getDate();
    }
    let temp = this.lastMonthEndDate - (this.currentMonthFirstDay - 1);
    let cel = this.numberList(temp, this.lastMonthEndDate, true).concat(this.numberList(1, (7 - this.currentMonthFirstDay), false));
    this.row.push(cel);
    temp = (7 - this.currentMonthFirstDay) + 1;
    // 计算除了第一行剩下的天数
    const leftDays = this.currentMonthEndDate - (7 - this.currentMonthFirstDay);
    // 剩下的星期数
    const lineNumber = Math.ceil(leftDays / 7);
    // 包含下个月日历的天数
    const nextDays = 7 - (leftDays % 7);
    for (let i = 0; i < lineNumber; i++) {
      if (i === lineNumber - 1 && nextDays > 0 && nextDays !== 7) {
        this.row[lineNumber] =
          this.numberList(temp, this.currentMonthEndDate, false)
            .concat(this.numberList(1, nextDays, true));
      } else {
        this.row.push(this.numberList(temp, temp + 6, false));
      }
      temp = temp + 7;
    }
  }

  numberList(start: number, end: number, flag: boolean) {
    let list = [];
    for (let i = start; i <= end; i++) {
      list.push({
        text: i,
        flag: !!flag
      });
    }
    return list;
  }

  handlerMonthAdd(n: number) {
    let year = this.select.year;
    if (n === -1) {
      const pre = this.select.month === 1 ? 12 : this.select.month - 1;
      if (pre === 12) {
        this.transform(new Date(year - 1, pre - 1, this.select.date));
      } else {
        this.transform(new Date(year, pre - 1, this.select.date));
      }
    } else {
      const next = this.select.month === 12 ? 1 : this.select.month + 1;
      if (next === 1) {
        this.transform(new Date(year + 1, next - 1, this.select.date));
      } else {
        this.transform(new Date(year, next - 1, this.select.date));
      }
    }
  }

  handlerPick(item: any) {
    if (!!item.flag) {
      if (item.text > 15) {
        this.transform(new Date(this.select.year, this.select.month - 2, parseInt(item.text)));
      } else {
        this.transform(new Date(this.select.year, this.select.month, parseInt(item.text)));
      }
    } else {
      this.transform(new Date(this.select.year, this.select.month - 1, parseInt(item.text)));
    }

    this.complete();
  }

  handlerSubmit() {
    this.$emit('input', this.select.year + '-' + this.select.month + '-' + this.select.date);
    this.show = false;
  }

  // 更改选中时间并向父组件派发事件
  complete() {
    // 触发父组件的传过来的picked事件。三个参数: 年，月，日
    this.$nextTick(() => {
      this.current = {
        year: this.select.year,
        month: this.select.month,
        date: this.select.date,
        day: this.select.day
      };
    });
  }

  transformNew() {
    this.transform();
  }

  handlerChangeValue(v: string) {
    console.log(v);
  }

  mounted() {
    this.transform(this.value);
    this.complete();
  }
}
</script>

<style lang="scss" scoped>
    .el-date-picker {
        width: 200px;
        position: relative;
    }

    .el-date-picker__timer {
        position: absolute;
        left: 0;
        right: 0;
    }

    .el-date-picker__timer__header__left {
        cursor: pointer;
    }

    .el-date-picker__timer__header__right {
        cursor: pointer;
    }

    .el-date-picker__timer {
        margin-top: 5px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 10px;
        border-radius: 5px;
    }

    .el-date-picker__timer__header {
        display: flex;
        justify-content: space-between;
    }

    .el-date-picker__timer__content {
        ul li {
            display: flex;
            justify-content: space-around;
            line-height: 30px;

            span {
                flex: 1;
                text-align: center;
                cursor: pointer;
            }

            .active-pick {
                border-radius: 50%;
                color: #409eff;
            }
        }
    }

    .el-date-picker__bottom {
        display: flex;
        justify-content: flex-end;
    }

    .el-date-picker__cancel {
        border-color: transparent;
        color: #409eff;
        background: transparent;
        font-size: 12px;
        line-height: 1;
        padding: 7px;
        cursor: pointer;
    }

    .el-date-picker__submit {
        margin-left: 10px;
        padding: 7px 15px;
        font-size: 12px;
        border-radius: 3px;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        line-height: 1;
        text-align: center;
        cursor: pointer;
    }
</style>