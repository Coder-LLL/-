/**
 * 一个对象要变成可迭代的，必须实现 @@iterator 方法
 * 即对象（或它原型链上的某个对象）必须有一个名字是 Symbol.iterator 的属性
 * 原生具有该属性的有：String、Array、TypedArray、Map 和 Set
 * 
 * */

console.log(typeof Symbol)

// 打印一下发现是一个函数 返回一个对象的无参函数，被返回对象符合迭代器协议
console.log(Array.prototype[Symbol.iterator])