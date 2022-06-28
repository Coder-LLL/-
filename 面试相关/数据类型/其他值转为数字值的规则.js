/***
 * ● 对象（包括数组）会首先被转换为相应的基本类型值，
 * 如果返回的是非数字的基本类型值，
 * 则再遵循以上规则将其强制转换为数字。
 *
 * 为了将值转换为相应的基本类型值，
 * 抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有valueOf()方法。
 * 如果有并且返回基本类型值，就使用该值进行强制类型转换。
 * 如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换
 */
let a = {
  // valueOf() {
  //   return 123;
  // },
  toString() {
    return 321;
  },
};
console.log(Number(a));

// undefined 转换为 NaN
console.log(Number(undefined));

// null 转换为 0
console.log(Number(null));

// null 转换为 0
console.log(Number(true));

// string 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。
console.log(Number('asd123'));
console.log(Number('213'));
