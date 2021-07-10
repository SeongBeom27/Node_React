var express = require('express')
var router = express.Router()

router.post('/login_process', function (req, res) {
  var post = req.body
  console.log('post data : ', post)
  res.redirect(`http://localhost:3000/`)
})

module.exports = router
