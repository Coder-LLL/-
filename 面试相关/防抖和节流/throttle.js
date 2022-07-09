function throttle(fn, interval, options = { leading: true, trailing: false }) {
  const { leading, trailing } = options;
  let lastTime = 0;
  let timer = null;
  const _throttle = function (...args) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime();
      // 当lastTime等于0 并且leading为false 的时候 不进行立即执行
      if (!lastTime && !leading) {
        lastTime = nowTime;
      }
      const remainTime = interval - (nowTime - lastTime);
      if (remainTime <= 0) {
        const result = fn.apply(this, args);
        resolve(result);
        lastTime = nowTime;
        return;
      }
      if (trailing && !timer) {
        timer = setTimeout(() => {
          timer = null;
          lastTime = !leading ? 0 : new Date().getTime();
          const result = fn.apply(this, args);
          resolve(result);
        }, remainTime);
      }
    });
  };
  _throttle.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    lastTime = 0;
  };
  return _throttle;
}
