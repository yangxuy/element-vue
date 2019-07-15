const isEmpty = (value: any) => {
  if (value === null || value === undefined) {
    return true;
  }

  return typeof value === 'string' && value.toString() === '';
};

export default {
  NotEmpty: {
    required: true,
    validator: (value: any, callback: Function) => {
      if (isEmpty(value)) {
        return callback(new Error('数据不能为空'));
      }
      callback();
    },
    trigger: 'change'
  }, // 不能为空
  number: {
    required: true,
    validator: (value: any, callback: Function) => {
      if (isEmpty(value)) {
        callback(new Error('不能为空'));
        return;
      }
      if (!(/^[-+]?([0-9]*\.[0-9]+|[0-9]+)$/.test(value))) {
        callback(new Error('必须是数字'));
        return;
      }

      callback();
    },
    trigger: 'blur'
  }, // 必须是数字
  date: {
    required: true,
    validator: (value: any, callback: Function) => {
      if (value === undefined || value === 0) {
        callback(new Error('必须是日期'));
      }

      callback();
    },
    trigger: 'change'
  } // 日期规则
  // phoneRule: {
  //     required: true,
  //     validator: (rule: any, value: any, callback: Function) => {
  //         const phoneRegularExpression = /^[1][3,4,5,7,8][0-9]{9}$/;
  //         if (isEmpty(value)) {
  //             return callback(new Error('不能为空'));
  //         }
  //
  //         if (!phoneRegularExpression.test(value)) {
  //             callback(new Error(i18n.t('ruler.phoneErr') as string));
  //         }
  //
  //         callback();
  //     },
  //     trigger: 'blur'
  // }, // 手机号码规则
  // userAmount: {
  //     required: true,
  //     validator: (rule: any, value: any, callback: Function) => {
  //         const regx = /^(\d+:\d+(\.\d+)?(,?))+$/;
  //         if (isEmpty(value)) {
  //             return callback(new Error(i18n.t('ruler.notEmpty') as string));
  //         }
  //
  //         if (!regx.test(value)) {
  //             callback(new Error(i18n.t('ruler.formatErr') as string));
  //         }
  //
  //         callback();
  //     },
  //     trigger: 'blur'
  // } // userAmount
};
