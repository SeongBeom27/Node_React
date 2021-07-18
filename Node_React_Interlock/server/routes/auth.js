var express = require('express')
var router = express.Router()
const db = require('../lib/db')

router.post('/login_process', function (req, res) {
  var post = req.body
  var email = post.email
  var pwd = post.password
  // DB에서 회원 정보들을 가져와서 로그인을 확인
  db.query(`SELECT * FROM member`, function (error, members) {
    for (var i = 0; i < members.length; i++) {
      if (members[i].email == email) {
        if (members[i].pwd == pwd) {
          console.log('로그인 성공')
          console.log('회원 정보')
          console.log('email : ', email)
          console.log('pwd : ', pwd)
          break
        }
      }
    }
  })

  res.redirect(`http://localhost:3000/`)
})

// 회원 가입 프로세스
router.post('/signup_process', function (req, res) {
  var post = req.body
  var nickname = post.nickname
  var email = post.email
  var pwd = post.password
  // DB에 회원가입 정보를 삽입한다.
  db.query(
    `INSERT INTO member (name, email, pwd) VALUES(?, ?, ?);`,
    [nickname, email, pwd],
    function (error, result) {
      // dbquery function의 result 객체는 insertId라는 key를 가지고 있다.
      // res.writeHead(302, { Location: `/topic/${result.insertId}` });
      // res.end();
      console.log('DB에 회원정보 : ', post, '삽입 완료')
      res.redirect(`http://localhost:3000/`)
    }
  )
})

module.exports = router
