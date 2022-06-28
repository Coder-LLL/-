/**
 * instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。
 * */
let arr1 = [22, 22, 11]
console.log(arr1 instanceof Array) // true


/**
 * 缺点：instanceof 只能用来判断对象类型，原始类型不可以。
 * 并且所有对象类型 instanceof Object 都是 true，且不同于其他两种方法的是它不能检测出iframes
 */
console.log(22 instanceof Number) // false

/**
 * 优点：instanceof可以弥补Object.prototype.toString.call()不能判断自定义实例化对象的缺点。
 * */

class A {}
let a1 = new A()
console.log(a1 instanceof A) // true