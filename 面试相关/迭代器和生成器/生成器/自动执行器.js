/**
 * Generator-Promise.js 文件中 我们可以看到
 *  Generator 和 callback 结合实现的异步，可以看到，
 * 仍然需要手动执行 .then 层层添加回调，
 * 但由于 next() 方法返回对象 {value: xxx,done: true/false} 
 * 所以我们可以简化它，写一个自动执行器：
 * */

// 传递一个 生成器函数
function run(gen) {
  // 获取生成器的迭代对象
  const g = gen()

  function next(data) {
    const res = g.next(data)
    //    // 深度递归，只要 `Generator` 函数还没执行到最后一步，`next` 函数就调用自身
    if (res.done) return res.value
    res.value.then(function (data) {
      next(data)
    })
  }
  next()
}

// run(function* () {
//   const res1 = yield Promise.resolve({
//     a: 1
//   });
//   console.log(res1);
//   // { "a": 1 }
//   const res2 = yield Promise.resolve({
//     b: 2
//   });
//   console.log(res2);
//   // { "b": 2 }
// });



// 可以看到，async function 代替了 function*，await 代替了 yield，同时也无需自己手写一个自动执行器 run 了
// async/await
const aa = async () => {
  const res1 = await Promise.resolve({
    a: 1
  });
  console.log(res1);

  const res2 = await Promise.resolve({
    b: 2
  });
  console.log(res2);

  return 'done'
}
const res = aa();