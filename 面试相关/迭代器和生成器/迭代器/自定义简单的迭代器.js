const getRawType = (target) => {
  return Object.prototype.toString.call(target).slice(8, -1)
}

const _createArrayInterable = (arr) => {
  if (typeof Symbol !== 'function' || !Symbol.iterator) return {};
  if (getRawType(arr) !== 'Array') throw new Error('it must be Array')
  const iterable = {}
  // Symbol.iterator 是一个无参的函数
  iterable[Symbol.iterator] = () => {
    arr.length++
    const iterator = {
      next: () => {
        return {
          value: arr.shift(),
          done: arr.length < 0
        }
      }
    }
    return iterator
  }
  return iterable
}

const iterable = _createArrayInterable(['人月', '神话'])
const iterator = iterable[Symbol.iterator]()

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())