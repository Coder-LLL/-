function myApply(thisArg, argArray) {
  // 1.获取到要执行的函数
  let fn = this

  // 处理要绑定的 thisArg
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window
  // 把要执行的函数挂在到要绑定的this对象上
  thisArg.fn = fn
  // 没传参数的情况下就给一个空数组
  // argArray = argArray ? argArray: []
  argArray = argArray || []
  const result = thisArg.fn(...argArray)
  delete thisArg.fn
  // 返回结果
  return result
}
Function.prototype.myApply = myApply

function sum(num1, num2) {
  console.log(this)
  console.log("sum函数被执行", num1, num2)
  return num1 + num2
}


var result = sum.myApply("abc", [20, 30])