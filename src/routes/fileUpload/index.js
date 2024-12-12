const app = require('express')
const router = app.Router()

router.get('/stream', function (req, res, next) {
  res.send('stream')
})



module.exports = router