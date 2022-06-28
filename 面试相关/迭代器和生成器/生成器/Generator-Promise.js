const gen = function* () {
  const res1 = yield Promise.resolve({
    a: 1
  })

  const res2 = yield Promise.resolve({
    b: 2
  })
}

// 拿到生成器的迭代器对象
const g = gen()

const g1 = g.next()
console.log('g1: ', g1)
g1.value
  .then((res1) => {
    console.log('res1: ', res1)
    const g2 = g.next(res1)
    console.log('g2: ', g2)
    g2.value
      .then(res2 => {
        console.log('res2: ', res2)
        g.next(res2)
      })
  })