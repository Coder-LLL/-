/**
 * 当检测 Array 实例时，Array.isArray 优于 instanceof ，
 * 因为 Array.isArray 和 Object.prototype.toString.call 可以检测出 iframes，而instanceof不能
 * 
 * 
 * 缺点：只能判别数组
 * 
 * */
let arr1 = [1, 2, 3]
console.log(Array.isArray(arr1))