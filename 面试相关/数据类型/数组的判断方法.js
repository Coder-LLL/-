let arr = [1, 2, 3];

// 判断方式1
console.log(Object.prototype.toString.call(arr).slice(8, -1));

// 判断方式2
console.log(arr.constructor === Array);

// 判断方式3
console.log(arr instanceof Array);

// 判断方式4
console.log(Array.isArray(arr));

// 判断方式5
console.log(Array.prototype.isPrototypeOf(arr));
