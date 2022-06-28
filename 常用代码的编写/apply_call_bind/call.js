function myCall(thisArg, ...args) {
  // 获取要执行的函数
  let fn = this
  // 2.对thisArg转成对象类型(防止它传入的是非对象类型)
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window

  // 3.调用需要被执行的函数 
  // 把 函数 fn 挂载到要绑定的对象上 然后通过隐式绑定的方法调用 这样 fn 内的this 就指向这个对象了
  thisArg.fn = fn
  const result = thisArg.fn(...args)
  delete thisArg.fn
  return result
}
Function.prototype.myCall = myCall

function sum(num1, num2) {
  console.log(this)
  console.log("sum函数被执行", num1, num2)
  return num1 + num2
}


var result = sum.myCall("abc", 20, 30)