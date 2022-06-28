let activeReactiveFn = null
class Depend {
  constructor(fn) {
    this.reactiveFns = fn
  }
  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }
  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

let targetMap = new WeakMap()

function getDepend(target, key) {
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
  }
  return depend
}


function reactive(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get: function () {
        const depend = getDepend(obj, key)
        depend.depend()
        return value
      },
      get: function (newValue) {
        value = newValue
        const depend = getDepend()
        depend.notify()
      }
    })
  })
}

const infoProxy = reactive({
  name: "why",
  age: 18
})
watchFn(() => {
  console.log(infoProxy.age)
})
infoProxy.age = 100


const foo = reactive({
  name: "foo",
  height: 188
})
watchFn(() => {
  console.log(foo.name)
})
watchFn(() => {
  console.log(foo.height)
})
foo.name = 'lzh'
foo.height = 190