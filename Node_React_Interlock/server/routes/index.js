var express = require('express')
var router = express.Router()

router.get('/login_process', function (req, res) {
  console.log('login_process post data : ', post)
  res.redirect(`http://localhost:3000/`)
})

module.exports = router
