let activeReactiveFn = null

class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  depend(fn) {
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



const targetMap = new WeakMap()

function getDepend(target, key) {
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}

function reactive(obj) {
  return new Proxy(obj, {
    get: function (target, key, receiver) {
      const depend = getDepend(target, key)
      depend.depend()
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver)
      const depend = getDepend(target, key)
      depend.notify()
    }
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