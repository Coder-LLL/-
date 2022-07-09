function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoke = false;

  const _debounce = function (...args) {
    return new Promise((resolve, reject) => {
      if (timer) {
        clearInterval(timer);
      }
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args);
        resolve(result);
        isInvoke = true;
      } else {
        timer = setTimeout(() => {
          const result = fn.apply(this, args);
          resolve(result);
          isInvoke = false;
          timer = null;
        }, delay);
      }
    });
  };

  _debounce.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    isInvoke = false;
  };
  return _debounce;
}
