const getIterator = iteratorable => iteratorable[Symbol.iterator]()

const arr = [1, 2, 3, 4, 5, 6]
const iterator = getIterator(arr)
while (true) {
  const obj = iterator.next()
  if (obj.done) {
    break
  }
  console.log(obj.value)
}