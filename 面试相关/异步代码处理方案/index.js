// request.js
function requestData(url) {
  // 异步请求的代码会被放入到executor中
  return new Promise((resolve, reject) => {
    // 模拟网络请求
    setTimeout(() => {
      // 拿到请求的结果
      resolve(url)
    }, 2000);
  })
}


// 需求: 
// 1> url: why -> res: why
// 2> url: res + "aaa" -> res: whyaaa
// 3> url: res + "bbb" => res: whyaaabbb


// 1.第一种方案: 多次回调
// requestData('why').then(res => {
//   requestData(res + 'aaa').then(res => {
//     requestData(res + 'bbb').then(res => {
//       console.log(res)
//     })
//   })
// })



// 2. 第二种方案: Promise中then的返回值来解决
// requestData('why').then(res => {
//   return requestData(res + "aaa")
// }).then(res => {
//   return requestData(res + "bbb")
// }).then(res => {
//   console.log(res)
// })




// 3.第三种方案: Promise + generator实现
function* getData() {
  const res1 = yield requestData('why')
  const res2 = yield requestData(res1 + 'aaa')
  const res3 = yield requestData(res2 + 'bbb')
  console.log(res3)
}
// 手动执行
// let generator = getData()
// generator.next().value.then(res => {
//   generator.next(res).value.then(res => {
//     generator.next(res).value.then(res => {
//       console.log(res)
//     })
//   })
// })

// 封装一个自动执行的函数
// function execGenerator(genFn) {
//   const generator = genFn()

//   function exec(res) {
//     const result = generator.next(res)
//     console.log(result)
//     if (result.done) {
//       return result.value
//     }
//     result.value.then(res => {
//       exec(res)
//     })
//   }
//   exec()
// }
// execGenerator(getData)



// 第四种async await
async function getDataAsync() {
  const res1 = await requestData("why")
  const res2 = await requestData(res1 + "aaa")
  const res3 = await requestData(res2 + "bbb")
  const res4 = await requestData(res3 + "ccc")
  console.log(res4)
}

getDataAsync()