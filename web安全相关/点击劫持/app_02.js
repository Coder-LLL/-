const express = require("express")

const app = express()

// 配置模板引擎 用于渲染页面
app.engine('html', require('express-art-template'))

app.get('/', (req, res) => {
  res.render('advertisement.html')
})

app.listen(4000, () => {
  console.log('http://localhost:4000')
})