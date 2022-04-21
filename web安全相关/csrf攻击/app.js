const express = require("express")

var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(require('express-session')({
  resave: false,
  saveUninitialized: true,
  secret: 'dadada'
}))
// 配置模板引擎 用于渲染页面
app.engine('html', require('express-art-template'))

app.get('/', (req, res) => {
  res.render('index.html', {
    user: req.session.user
  })
})

app.get('/login', (req, res) => {
  res.render('login.html')
})

app.post('/login', (req, res) => {
  const user = req.body
  console.log(req.body)
  if (user.username === 'lzh' && user.password === '123456') {
    req.session.user = user
    return res.redirect('/')
  }
  res.render('login.html')
})


app.post('/transfer', (req, res) => {
  // 校验登陆状态
  if (!req.session.user) {
    return res.status(404).send('未授权')
  }
  res.send('success')
})
app.listen(3000, () => {
  console.log('http://localhost:3000')
})