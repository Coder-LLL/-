/***
 * for in 主要用于遍历对象
 * for(keys in obj)
 * 循环出来的 keys 是obj对象中的每一个键值对的键 需要额外使用 obj[keys] 来取到每个值
 * 注意: for in循环不仅能读取对象自身上面的成员对象 还能读取原型链上的可枚举属性
 * 可以通过 hasOwnProperty 判断属性是不是自身的
 */

class Person {
  constructor(name, age) {
    this.age = age;
    this.name = name;
  }
}
Person.prototype["school"] = "广外";
let obj = new Person("lzh", "188");

for (const key in obj) {
  console.log(obj[key]);
}

/***
 * for of 可以用于遍历数组 map 类对象等等
 * 只要该数据结构具有iterator接口 （即具有 Symbol.iterator 属性）
 *
 * for of 遍历对象的时候 返回的是对象的键值
 * for in返回的是对象的键名
 *
 * for in 遍历数组的时候 返回的是下标
 * for of 遍历数组的时候 返回的是值
 */
const arr = [1, 2, 3];
for (const item of arr) {
  console.log(item);
}

// 如果要使用 for of 遍历对象 则需要为其实现 Symblo.iterator接口
let obj2 = {
  age: "20",
  name: "lzh",
};
obj2[Symbol.iterator] = function () {
  var keys = Object.keys(this);
  var count = 0;
  return {
    next() {
      if (count < keys.length) {
        return { value: keys[count++], done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
  };
};

for (const iterator of obj2) {
  console.log(iterator);
}
