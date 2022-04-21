const express = require("express")

const app = express()

// 配置模板引擎 用于渲染页面
app.engine('html', require('express-art-template'))

app.get('/', (req, res) => {
  // 1. 读取要渲染的页面内容
  // 2. 渲染： 将数据和页面替换到一起
  // 3. 将渲染结果发送给客户端
  res.render('index.html', {
    foo: 'bar',
    search: req.query.search //通过地址栏传递文本输入框的内容 例如 ?search=abc
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})