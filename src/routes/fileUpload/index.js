const app = require('express')
const router = app.Router()

const fs = require('node:fs')
const path = require('node:path')

router.get('/stream', function (req, res, next) {

  const file = path.resolve(__filename, '../../../../public/test.zip')
  const fileStream = fs.createReadStream(file);
  const fileInfo = fs.statSync(file);

  const head = {
    'Content-Type': 'application/zip, application/octet-stream; charset=ISO-8859-1',
    'Content-Disposition': 'attachment;filename=\"test.zip\"',
    'Content-Length': fileInfo.size
  };
  res.writeHead(200, head);
  fileStream.pipe(res);
})



module.exports = router