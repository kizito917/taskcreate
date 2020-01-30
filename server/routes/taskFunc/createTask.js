const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const taskModel = require('../../models/task');

//initializing variables for mail sending authentication
const GMAIL_USER = process.env.GMAIL_USERNAME;
const GMAIL_PASS = process.env.GMAIL_PASSWORD;

let transporter = nodemailer.createTransport({
	host: 'smtp.googlemail.com',
	port: 465,
	secure: true,
	auth : {
		user: GMAIL_USER,
		pass: GMAIL_PASS
	}
});


//route for user to create a task 
router.post('/createTask', isValidUser, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(400).json({
                message: 'Unable to process request'
            })
        } else {
            req.params = authData
            var userTaskDetails = taskModel({
                user_id: req.params.user.id,
                username: req.params.user.username,
                email: req.params.user.email,
                taskId: req.body.taskId,
                taskTitle: req.body.taskTitle,
                taskDesc: req.body.taskDesc,
                taskStatus: 'pending',
                start_date: Date.now(),
                end_date: Date.now()
            })
            userTaskDetails.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        message: 'Unable to create task'
                    })
                } else {
                    let mailOptions = {
                        from: GMAIL_USER,
                        to: 'johnkingsley917@gmail.com',
                        subject: 'New Task Created',
                        html: '<h4> Hi ' + result.username + ', A new task with Title: ' + '<b>' + result.taskTitle + '</b>' + ' has just been created by you <br> Your task is currently having a status: PENDING and will be due by ' + result.end_date + '.</h4>'
                    }
        
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error)
                        } else {
                            return res.status(200).json({
                                message: 'Task created Successfully',
                                taskInfo: {
                                    taskId: result.taskId,
                                    taskTitle: result.taskTitle,
                                    taskDesc: result.taskDesc,
                                    taskStatus: result.taskStatus,
                                    start_Date: result.startDate,
                                    end_date: result.endDate
                                }
                            })
                        }
                    }) 
                }
            })
        }
    })
})


//route to get all user tasks
router.get('/myTasks', isValidUser, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(403).json(err)
        } else {
            req.params = authData
            taskModel.find({user_id: req.params.user.id}, (err, result) => {
                if (err) {
                    return res.statusCode(501).json(err)
                } else {
                    return res.status(200).json({
                        message: 'All Tasks Successfully Fetched',
                        result
                    })
                }
            })
        }
    })
})

//route to get details of a particular task
router.get('/myTask/:id', isValidUser, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(401).json(err)
        } else {
            req.params = authData
            taskModel.findById({taskId: req.params.taskId}, {useFindAndModify: false},
                 (err, result) => {
                     if (err) {
                         return res.status(401).json(err)
                     } else {
                         return res.status(200).json({
                             message: 'Task Details Fetched',
                             result
                         })
                     }
                 })
        }
    })
})


//function to check validated user
function isValidUser(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
		next();
	} else {
		res.status(403).json({
			message: 'Unauthorized request'
		})
	}
}

module.exports = router