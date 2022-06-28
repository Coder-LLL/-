var arr = [1, 2, 3, [4, 5],
  [6, [7, [8]]]
]
/**
 * @returns
 */
// 递归法
// function wrap(arr) {
//   const res = []

//   function flat(a) {
//     for (var item of a) {
//       if (item.constructor === Array) {
//         flat(item)
//       } else {
//         res.push(item)
//       }
//     }
//   }
//   flat(arr)
//   return res
// }
// console.log("递归版的flat", wrap(arr))




const flatten = function (arr) {
  while (arr.some(item => Array.isArray(item))) {
    console.log(...arr)
    /**
     * 当concat参数不为数组时,如上面的[1,2],4,5，
     * 则会将[1,2],4,5里面的参数若是基本类型则直接push进数组，
     * 如果是多维数组则只会拆开一层，
     * 而调用者数组不会改变，会原封不动的首先添加到新数组中
     * */
    arr = [].concat(...arr)
    console.log(arr)
  }
  return arr
}

console.log(flatten(arr))


var a = {
  i: 1,
  toString() {
    return a.i++;
  }
}
var value = 1

if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}
// let a = [1, 2, 3];
// a.toString = a.shift;
// if (a == 1 && a == 2 && a == 3) {
//   console.log(1);
// }