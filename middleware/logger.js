const app = require('express')

var morgan = require('morgan')
var FileStreamRotator = require('file-stream-rotator')
var path = require('path')

const commonLogConfig = {
  frequency: "daily",
  date_format: "YYYY-MM-DD",
  size: "10M",
  max_logs: "10d",
  audit_file: path.join(__dirname, "../log/audit.json"),
  extension: ".log",
  create_symlink: true,
  symlink_name: "tail-current.log",
}


// create a rotating write stream
// var accessLogStream = rfs.createStream('access.log', {
//   interval: '1d', // rotate daily
//   path: path.join(__dirname, 'log')
// })

var rotatingCommonLogStream = FileStreamRotator.getStream({
  filename: path.join(__dirname, "../log/common/%DATE%"),
  ...commonLogConfig
})

var rotatingErrorLogStream = FileStreamRotator.getStream({
  filename: path.join(__dirname, "../log/error/%DATE%"),
  ...commonLogConfig
})

const errorMorgan = morgan('combined', {
  skip: function (req, res) {
    console.log('XXXX', res.statusCode);
    return ![404, 500].includes(res.statusCode)
  },
  stream: rotatingErrorLogStream
})

const commonMorgan = morgan('combined', {
  stream: rotatingCommonLogStream
})


// app.use(morgan('dev', {
//   skip: function (req, res) { return res.statusCode < 400 }
// }))


module.exports = {
  commonMorgan,
  errorMorgan
}