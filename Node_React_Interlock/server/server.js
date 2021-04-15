const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

var IndexRouter = require('./routes/index');

app.use('/', IndexRouter);
/**
 * localhost:3001/api url로 
 * 
 * {
     "username": "bryan"
    }
    위 json 데이터를 보낸다
 */
app.use('/api', (req, res)=> res.json({username:'bryan'}));

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})