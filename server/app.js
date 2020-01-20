const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser');
const port = process.env.PORT;
const userAuthRoute = require('./routes/auth/userAuth');
const createTaskRoute = require('./routes/taskFunc/createTask');
const updateTaskStatusRoute = require('./routes/taskFunc/taskStatus');
const updateUserProfileRoute = require('./routes/profile/editProfile');
const getUserProfileRoute = require('./routes/profile/viewProfile');
const passwordChangeRoute = require('./routes/profile/passwordChange');
const db_conn = require('./config/conn');

//placing cors options for origin and other access details
var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}  

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/auth', userAuthRoute);
app.use('/user', createTaskRoute, updateTaskStatusRoute, 
                updateUserProfileRoute, getUserProfileRoute,
                passwordChangeRoute);

app.listen(port, (err, done) => {
    if(err) {
        console.log(err)
    } else {
        console.log('successfully connected to port ' + port)
    }
})