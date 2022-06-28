/**
 * 
 * 每一个继承 Object 的对象都有 toString 方法，
 * 如果 toString 方法没有重写的话，会返回 [Object type]，
 * 其中 type 为对象的类型。但当除了 Object 类型的对象外，
 * 其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，
 * 所以我们需要使用call或者apply方法来改变toString方法的执行上下文
 * 
 * */


/**
 * 大部分都会重写 toString 所以直接调用 toString 会直接返回内容的字符串
 * 
 * 但当除了Object 类型的对象外其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，
 * 所以我们需要使用 call 或者 apply 方法来改变 toString 方法的执行上下文
 * */
const an = ['Hello', 'An'];
console.log(an.toString()) // "Hello,An"
console.log(Object.prototype.toString.call(an)); // "[object Array]



// 对于 Object.prototype.toString.call(arg)，
// 若参数为 null 或 undefined，直接返回结果。
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(undefined))

/**
 * 
 * 若参数不为 null 或 undefined，则将参数转为对象，
 * 再作判断。对于原始类型，转为对象的方法即装箱，
 * 此处不赘述。转为对象后，取得该对象的 [Symbol.toStringTag] 属性值（可能会遍历原型链）作为 tag，
 * 如无该属性，或该属性值不为字符串类型，
 * 则依下表取得 tag, 然后返回 "[object " + tag + "]" 形式的字符串。
 * 
 * */


// Boolean 类型，tag 为 "Boolean"
Object.prototype.toString.call(true); // => "[object Boolean]"

// Number 类型，tag 为 "Number"
Object.prototype.toString.call(1); // => "[object Boolean]"

// String 类型，tag 为 "String"
Object.prototype.toString.call(""); // => "[object String]"

// Array 类型，tag 为 "String"
Object.prototype.toString.call([]); // => "[object Array]"

// Arguments 类型，tag 为 "Arguments"
Object.prototype.toString.call((function () {
  return arguments;
})()); // => "[object Arguments]"

// Function 类型， tag 为 "Function"
Object.prototype.toString.call(function () {}); // => "[object Function]"

// Error 类型（包含子类型），tag 为 "Error"
Object.prototype.toString.call(new Error()); // => "[object Error]"

// RegExp 类型，tag 为 "RegExp"
Object.prototype.toString.call(/\d+/); // => "[object RegExp]"

// Date 类型，tag 为 "Date"
Object.prototype.toString.call(new Date()); // => "[object Date]"

// 其他类型，tag 为 "Object"
Object.prototype.toString.call(new class {}); // => "[object Object]"

/**
 * 优点：这种方法对于所有基本的数据类型都能进行判断，即使是 null和defined
 * 
 * 缺点：不能精准判断自定义对象，因为自定义对象没有设置 [Symbol.toStringTag] ，对于自定义对象只会返回[object Object]
 * 
 * */

/**
 * 当然也可以手动的给 自定义对象添加 [Symbol.toStringTag]
 * [Symbol.toStringTag] 属性值期望是一个字符串，否则会被忽略。
 * */

// 设置为字符串
var o1 = {
  [Symbol.toStringTag]: "A"
};
// 设置为 非字符串 则直接忽略
var o2 = {
  [Symbol.toStringTag]: null
};
// => "[object A]"
console.log(Object.prototype.toString.call(o1));
// => "[object Object]"  [Symbol.toStringTag] 设置为非字符串直接忽略，返回 "[object " + tag + "]" 
console.log(Object.prototype.toString.call(o2));


// 更巧妙地方法是： Symbol.toStringTag 可以部署在原型链上：
class A {}
A.prototype[Symbol.toStringTag] = "A";
Object.prototype.toString.call(new A()); // => "[object A]"