export const type = (data: any) => {
  return Object.prototype.toString.call(data).slice(8, -1);
};
// 保证多少ms内只执行一次
export const throttle = (delay: number, callback: Function) => {
  let timeId: number | undefined;
  let lastExec = 0;

  function wrapper() {
    // @ts-ignore
    let self = this;
    let elapsed = Number(new Date()) - lastExec;
    let args = arguments;

    function exec() {
      lastExec = Number(new Date());
      callback.apply(self, args);
    }

    function clear() {
      clearTimeout(timeId);
    }

    if (timeId) {
      clear();
    }
    if (elapsed > delay) {
      exec();
    } else {
      timeId = setTimeout(exec, delay - elapsed);
    }
  }

  return wrapper;
};
//保证多少ms内不再被触发时就会执行一次
export const debounce = (delay: number, callback: Function) => {
  let timeId: number | undefined;

  function wrapper() {
    // @ts-ignore
    let self = this;
    let args = arguments;
    if (timeId) {
      clearTimeout(timeId);
      console.log(timeId);
    }
    timeId = setTimeout(function () {
      callback.apply(self, args);
    }, delay);
  }

  return wrapper;
};