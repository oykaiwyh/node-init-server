/* 外部依赖 */
const express = require('express')

/* 项目依赖 */
const { APP_CONFIG } = require('./config/index')
const fileUploadRoutes = require('./routes/fileUpload/index')
const { commonMorgan, errorMorgan } = require('./middleware/logger')

/* 实例 */
const app = express()

/* 中间件 */
// 日志
app.use(errorMorgan)
app.use(commonMorgan)


app.use('/node', fileUploadRoutes)


app.listen(APP_CONFIG.port, () => {
  console.log('http://localhost:' + APP_CONFIG.port);
})
