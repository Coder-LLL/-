function myBind(thisArg, ...argArray) {
  let fn = this

  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window

  function proxy(...args) {
    thisArg.fn = fn
    // 合并参数
    let finalArgs = [...argArray, ...args]
    const result = thisArg.fn(...finalArgs)
    delete thisArg.fn
    return result
  }
  return proxy
}

Function.prototype.myBind = myBind

function sum(num1, num2, num3, num4) {
  console.log(this)
  console.log(num1, num2, num3, num4)
}

// 系统的bind使用
var bar = sum.bind("abc")
bar(1, 2, 3, 4)