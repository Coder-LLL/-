/***
 * 为了告诉你这个值不是一个数字，一种表示方法，而非一个精准有效的值，因此NaN不能参与计算，也无法与自身比较。
 */
console.log(Number('echo'));

/***
 * isNaN传递一个参数，它的本意是通过Number()方法尝试转换参数的类型为Number，如果包含非数字值则转换失败
 * 如果转换成功返回false，否则转返回true，
 * 它只是判断这个参数能否转成数字而已，并不是判断是否严格等于NaN。
 * 当我们要判断某个值是否严格等于NaN时 不能使用 isNaN() 毕竟传递任何的带有非数字的字符串都会返回true
 */
console.log(isNaN('123')); //false
console.log(isNaN('123abc')); //true
console.log(isNaN('abc')); //true

/**
 * Number.isNaN() 不存在任何的转换行为 用于判断一个值是否严格等于NaN
 * */
console.log(Number.isNaN(NaN));
console.log(Number.isNaN(123));
console.log(Number.isNaN('123'));
