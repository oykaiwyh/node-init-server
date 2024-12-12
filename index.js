/* 外部依赖 */
const express = require('express')

// node自身依赖
const path = require('node:path')

/* 项目依赖 */
const { APP_CONFIG } = require('./config/index')
const fileUploadRoutes = require('./src/routes/fileUpload/index')
const { commonMorgan, errorMorgan } = require('./src/middleware/logger')

/* 实例 */
const app = express()

/* 中间件 */
// POST/PUT的json解析 parse application/json (for express@4.16.x)
app.use(express.json());
//parse  application/x-www-form-urlencoded (for express@4.16.x)
app.use(express.urlencoded({ extended: false }));

// 静态文件服务
app.use('/static', express.static(path.join(__dirname, 'public')));

// 日志
app.use(errorMorgan)
app.use(commonMorgan)

// 路由
app.use('/node', fileUploadRoutes)


app.listen(APP_CONFIG.port, () => {
  console.log('http://localhost:' + APP_CONFIG.port);
})
