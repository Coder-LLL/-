const express = require("express")

const app = express()

// 配置模板引擎 用于渲染页面
app.engine('html', require('express-art-template'))

// app.get('/', (req, res) => {
//   // 1. 读取要渲染的页面内容
//   // 2. 渲染： 将数据和页面替换到一起
//   // 3. 将渲染结果发送给客户端
//   res.render('index.html', {
//     foo: 'bar',
//     search: req.query.search //通过地址栏传递文本输入框的内容 例如 ?search=abc
//   })
// })

const articles = [{
  id: 1,
  title: 'article 1',
  body: 'article 1 body'
}, {
  id: 2,
  title: 'article 2',
  body: 'article 2 body'
}, {
  id: 3,
  title: 'article 3',
  body: 'article 3 body'
}, {
  id: 4,
  title: 'article 3',
  body: '<script>alert(123)</script>'
}]

/**
 * 当读取文章4 的时候 script脚本会被触发
 * */
app.get('/article/:id', (req, res) => {
  const article = articles.find(article => article.id == req.params.id)
  console.log(article)
  if (!article) {
    return res.status(404).send('文章不存在')
  }
  res.render('index.html', {
    article
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})