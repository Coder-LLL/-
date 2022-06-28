/*
 * @Description: file content
 * @Author: Zhonghui Lei
 * @Date: 2022-06-20 17:09:57
 * @LastEditors: Zhonghui Lei
 * @LastEditTime: 2022-06-20 17:36:34
 */
self.onmessage = (event) => {
  console.log(event.data); // 'hello'
  postMessage("world");
};
