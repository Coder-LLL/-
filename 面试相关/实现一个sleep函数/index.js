// promise
// const sleep = (time) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time)
//   })
// }
// sleep(2000).then(() => {
//   console.log("promise 实现sleep")
// })

// generator
// function* sleep(fn, time, ...args) {
//   function innerFn() {
//     setTimeout(() => {
//       fn(...args)
//     }, time)
//   }
//   yield innerFn()
// }
// sleep(() => {
//   console.log('generator 实现sleep')
// }, 1000).next()

// await async 实现sleep
async function sleep(fn, time, ...args) {
  function innerFn() {
    setTimeout(() => {
      fn(...args)
    }, time)
  }
  await innerFn()

}
sleep((item) => {
  console.log(item)
}, 1000, 'E1e');