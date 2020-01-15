const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyparser = require('body-parser')
const port = process.env.PORT;
const userAuthRoute = require('./routes/auth/userAuth');
const db_conn = require('./config/conn');

var corsOptions = {
    origin: '*',
}  

app.use(cors(corsOptions))
app.use(bodyparser.urlencoded({extended: false}))
app.use('/auth', userAuthRoute)

app.listen(port, (err, done) => {
    if(err) {
        console.log(err)
    } else {
        console.log('successfully connected to port ' + port)
    }
})