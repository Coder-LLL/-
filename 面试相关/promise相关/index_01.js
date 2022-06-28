// promise的resolve 可以传递三种类型的参数
/**
 * resolve(参数)
 *  1> 普通的值或者对象  pending -> fulfilled
 *  2> 传入一个Promise
 *    那么当前的Promise的状态会由传入的Promise来决定
 *    相当于状态进行了移交
 *  3> 传入一个对象, 并且这个对象有实现then方法(并且这个对象是实现了thenable接口)
 *    那么也会执行该then方法, 并且又该then方法决定后续状态
 */

// 1.传入普通值或者对象
// let promise1 = new Promise((resolve, reject) => {
//   resolve('success')
// })
// promise1.then(data => {
//   console.log(data)
// }, err => {
//   console.log(err)
// })


// 2. 传入 promise 的情况
// let newPromise = new Promise((resolve, reject) => {
//   // resolve("newPromise success")
//   reject("not allow")
// })
// let promise2 = new Promise((resolve, reject) => {
//   resolve(newPromise)
// })
// promise2.then(data => {
//   console.log(data)
// }, err => {
//   console.log(err)
// })

let promise3 = new Promise((resolve, reject) => {
  let obj = {
    then: function (resolve, reject) {
      // resolve("resolve success")
      reject("reject message")
    }
  }
  resolve(obj)
})
promise3.then(data => {
  console.log(data)
}, err => {
  console.log(err)
})