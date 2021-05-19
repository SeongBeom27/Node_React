const express = require('express')
const app = express()
const db = require('./lib/db')
/**
 * what is cors??
 */
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())

var IndexRouter = require('./routes/index')

app.use('/', IndexRouter)
/**
 * localhost:3001/api url로 
 * 
 * {
     "username": "bryan"
    }
    위 json 데이터를 보낸다
 */
app.use('/api', (req, res) => res.json({ username: 'bryan' }))
app.use('/topic', function (req, res) {
  // author_id 를 이용해서 author 정보도 가져오기
  db.query(`SELECT * FROM topic`, function (error, topics) {
    res.json({ topics: topics })
  })
})
// https://stackoverflow.com/questions/51115640/how-to-send-form-data-from-react-to-express/51116082
// https://stackoverflow.com/questions/54952355/how-to-post-data-from-react-to-express
// 참고하기
app.post('/create_process', function (req, res) {
  console.log(req)
  var post = req.body
  db.query(
    `INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), 1);`,
    [post.title, post.description, post.author],
    function (error, result) {
      // dbquery function의 result 객체는 insertId라는 key를 가지고 있다.
      // res.writeHead(302, { Location: `/topic/${result.insertId}` });
      // res.end();
      console.log(post.title, post.description, post.author)
      res.redirect(`http://localhost:3000/`)
    }
  )
})

app.listen(port, () => {
  console.log(`express is running on ${port}`)
})
