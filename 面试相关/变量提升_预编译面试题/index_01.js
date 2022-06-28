/**
 *  第一题
 *  此处 foo 没执行 所以还是 100
 * */
// var n = 100

// function foo() {
//   n = 200
// }
// console.log(n) // 100


/**
 *  第二题
 *  在 foo 的变量作用域中有一个 a 所以不会往 globalObject 上去找
 *  但是在打印的时候 a 还没赋值 只是在预编译阶段进行了变量的提升 值为 undefined
 * */
// var a = 100
// function foo() {
//   console.log(a) // undefined
//   return
//   var a = 100
// }
// foo()



/**
 * 第三题
 * */
// function foo() {
//   console.log(n) // undefined
//   var n = 200
//   console.log(n) // 200
// }
// var n = 100
// foo()



/**
 * 第四题
 * 
 * var a = b = c = 100 ar a = (b = (c = 100))
 * var a = b = 100 相当于 var a = (b = 100) b是隐式赋值 所以是挂在到 全局上的 只有 a 使用过 var 显示赋值
 * */
// function foo() {
//   // 这里a是局部变量，b是全局变量
//   var a = b = 100
// }
// foo()
// console.log(a, b) //a is not defined,100


/**
 * 
 * 第五题
 * foo2 的作用域中有一个 n 值为 200 
 * foo1 中没有 所以顺着作用域往上找
 * */
// var n = 100

// function foo1() {
//   console.log(n) // 100
// }

// function foo2() {
//   var n = 200
//   console.log(n) // 200
//   foo1()
// }
// foo2()
// console.log(n) // 100




/**
 * 第六题
 * 1.要知道js解析变量声明的顺序
 * 2.函数声明和变量声明会置顶且函数声明更优先！
 * 3.作用域链的查找顺序是由里向外，js执行代码顺序是自上往下
 * */
// function fn(a) {
//   console.log(a) // fn 函数声明更先
//   var a = 123
//   console.log(a) // 123

//   function a() {}
//   console.log(a) // 123

//   var b = function () {}
//   console.log(b) // fn

//   function d() {}
// }
// fn(1)


// 第七题
a = 100

function demo(e) {
  function a() {}

  arguments[0] = 2
  console.log(e) // 2

  // if中之前不可以写函数，现在似乎可以，不争论，按照可以写来推论结果
  if (a) {
    var b = 123
    var c = function () {}
  }

  var c
  a = 10 // 在函数作用域中找到了 a 所以直接赋值给函数作用域中的 a 不会再去window 全局变量中找了
  var a
  console.log(b) // 123
  f = 123
  console.log(c) // fn
  console.log(a) // 10

}
var a
demo(1)
console.log(a) // 100
console.log(f) // 123