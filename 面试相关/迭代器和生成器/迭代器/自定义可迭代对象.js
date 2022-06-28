/**
 * 箭头函数体内的this对象，就是定义该函数时所在的作用域指向的对象
 * 而不是使用时所在的作用域指向的对象。
 * 
 * 所以这里最好别用箭头函数即:
 * Object.prototype[Symbol.iterator] =  () => {}
 * */
Object.prototype[Symbol.iterator] = function () {
  const items = Object.entries(this)
  return {
    next: () => {
      return {
        value: items.shift(),
        done: items.length < 0
      }
    }
  }
}


const obj = {
  name: 'amap',
  bu: 'sharetrip'
}
for (let value of obj) {
  console.log(value);
}