const express = require('express')
const app = express()
const db = require('./lib/db')
/**
 * what is cors??
 */
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
var IndexRouter = require('./routes/index')
var topicRouter = require('./routes/topic')

app.use(cors())
app.use(bodyParser.json())

app.use('/topics', function (req, res) {
  // author_id 를 이용해서 author 정보도 가져오기
  db.query(`SELECT * FROM topic`, function (error, topics) {
    res.json({ topics: topics })
  })
})
/**
 * localhost:3001/api url로 
 * 
 * {
     "username": "bryan"
    }
    위 json 데이터를 보낸다
 */
app.use('/api', (req, res) => res.json({ username: 'bryan' }))

app.use('/topic', topicRouter)
app.use('/', IndexRouter)

app.listen(port, () => {
  console.log(`express is running on ${port}`)
})
