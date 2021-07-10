const express = require('express')
const router = express.Router()
const db = require('../lib/db')

// https://stackoverflow.com/questions/51115640/how-to-send-form-data-from-react-to-express/51116082
// https://stackoverflow.com/questions/54952355/how-to-post-data-from-react-to-express
// 참고하기
router.post('/create_process', function (req, res) {
  var post = req.body
  console.log('post data : ', post)
  db.query(
    `INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), 1);`,
    [post.title, post.description],
    function (error, result) {
      // dbquery function의 result 객체는 insertId라는 key를 가지고 있다.
      // res.writeHead(302, { Location: `/topic/${result.insertId}` });
      // res.end();
      res.redirect(`http://localhost:3000/`)
    }
  )
})

router.post('/update_process', function (req, res) {
  var post = req.body
  console.log(post)
  db.query(
    `update topic set title=?, description=? WHERE id=?;`,
    [post.title, post.description, post.id],
    function (error, result) {
      // dbquery function의 result 객체는 insertId라는 key를 가지고 있다.
      res.redirect(`http://localhost:3000/`)
    }
  )
})

router.post('/delete_process', function (req, res) {
  var post = req.body
  db.query(`DELETE FROM topic WHERE id=?`, [post.id], function (error, result) {
    if (error) {
      throw error
    }
    res.redirect(`http://localhost:3000/`)
  })
})

module.exports = router
