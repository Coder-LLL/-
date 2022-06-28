/**
 * 
 * 原型链继承:原型链继承的思想：一个引用类型继承另一个引用类型的属性和方法。
 * 
 */

// function SuperType() {
//   this.b = [1, 2, 3]
// }

// function SubType() {
//   this.a = '1'
// }

// SubType.prototype = new SuperType()
// SubType.prototype.constructor = SubType

// var sub1 = new SubType();
// var sub2 = new SubType();
// sub1.b.push(4);

// console.log(sub1.b); // [1,2,3,4]
// console.log(sub2.b); // [1,2,3,4]
// console.log(sub1 instanceof SuperType); // true


/**
 * 
 * 构造函数继承
 * 
 */
// function SuperType(name) {
//   this.name = name;
//   this.b = [1, 2, 3];
// }

// SuperType.prototype.say = function () {
//   console.log("HZFE");
// };

// function SubType(name) {
//   SuperType.call(this, name);
// }

// var sub1 = new SubType();
// var sub2 = new SubType();
// // 传递参数
// var sub3 = new SubType("Hzfe");

// // sub1.say(); // 使用构造函数继承并没有访问到原型链，say 方法不能调用

// console.log(sub3.name); // Hzfe

// sub1.b.push(4);

// // 解决了原型链继承中子类实例共享父类引用属性的问题
// console.log(sub1.b); // [1,2,3,4]
// console.log(sub2.b); // [1,2,3]
// console.log(sub1 instanceof SuperType); // false


/**
 * 
 * 组合继承（伪经典继承）
 * 其实 SubType.prototype 保存了一份 SuperType 中的属性和方法
 * SubType 实例化出来的对象也保存了一份 但是实例化对象在访问这些属性和方法的 的时候 优先访问自己的 所以不存在引用属性共享问题
 * 
 */

// function SuperType(name) {
//   this.name = name;
//   this.a = "HZFE";
//   this.b = [1, 2, 3, 4];
// }

// SuperType.prototype.say = function () {
//   console.log("HZFE");
// };

// function SubType(name) {
//   SuperType.call(this, name); // 第二次调用 SuperType
// }

// SubType.prototype = new SuperType(); // 第一次调用 SuperType
// SubType.prototype.constructor = SubType;
// let sub1 = new SubType()
// console.log(SubType.prototype)
// console.log(sub1)
// console.log("修改sub1的 b数组")
// sub1.b = [1, 2]
// console.log(SubType.prototype)
// console.log(sub1)



/**
 * 
 * 寄生组合式继承
 * 
 */

// 在函数内部，第一步创建父类原型的一个副本，第二部是为创建的副本添加 constructor 属性，
// 从而弥补因重写而失去的默认的 constructor 属性。最后一步，将新创建的对象（即副本）赋值给予类型的原型。
// inheritPrototype 是用来继承 SuperType 原型上的属性和方法的
// 而 SubType 中的  SuperType.call(this, name); 是继承 实例属性和方法
function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; // 指定对象
}

function SuperType(name) {
  this.name = name;
  this.b = [1, 2, 3]
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, num) {
  SuperType.call(this, name);
  this.num = num;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayNum = function () {
  console.log(this.num);
}

let sub1 = new SubType()
let sub2 = new SubType()

console.log(sub1)
console.log(sub2)
sub1.b = [1, 2]

console.log(sub1)
console.log(sub2)