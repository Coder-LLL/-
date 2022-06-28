/**
 * 
 * new在这个生成实例过程中到底进行了哪些步骤来实现？我将其总结为下面几个步骤：
 * 创建一个空的简单JavaScript对象，即 {}；
 * 将构造函数的作用域赋给新对象（this指向新对象）；
 * 执行构造函数中的代码（为新对象添加属性）；
 * 如果该函数没有返回对象，则返回this。
 * 
 * */


// function _new(ctor, ...args) {
//   // 第一个参数必须是构造函数
//   if (typeof ctor !== 'function') {
//     throw new Error("_new function the first param must be a function")
//   }

//   let newObj = new Object {}
//   // 实例的 _proto_ 跟 构造函数的 prototype 联系起来
//   newObj._proto_ = Object.create(ctor.prototypre)
//   let res = ctor.apply(newObj, args)

//   let isObject = typeof res === 'Object' && res !== null
//   let isFunction = typeof res === 'function'
//   return isObject || isFunction ? res : newObj
// }

function _new(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw new Error("_new function the first params must be function")
  }
  let newObject = new Object();
  newObject.__proto__ = Object.create(ctor.prototype);
  let res = ctor.apply(newObject, args)
  let isObject = typeof res === 'object'
  let isFunction = typeof res === 'function'
  return isFunction || isObject ? res : newObject
}

//构造函数
function Person(name, sex) {
  this.name = name;
  this.sex = sex
}
Person.prototype.getName = function () {
  return this.name
}

const zcy = new Person('zcy', '男');
const forceddd = _new(Person, 'forceddd', '男');
console.log(zcy);
console.log(forceddd);
console.log(zcy.getName());
//共享原型上的方法
console.log(zcy.getName === forceddd.getName); //true