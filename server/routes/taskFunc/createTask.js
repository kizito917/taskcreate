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
            let userTaskDetails = taskModel({
                user_id: req.params.user.id,
                username: req.params.user.username,
                email: req.params.user.email,
                taskId: req.body.taskId,
                taskTitle: req.body.taskTitle,
                taskDesc: req.body.taskDesc,
                taskStatus: 'pending',
                start_Date: req.body.startDate,
                end_date: req.body.endDate
            })
            userTaskDetails.save((err, result) => {
                if(err) {
                    return res.status(400).json({
                        message: 'Unable to create task'
                    })
                } else {
                    let mailOptions = {
                        from: GMAIL_USER,
                        to: 'johnkingsley917@gmail.com',
                        subject: 'New Task Created',
                        html: 'Hi' + result.username + ', A new task with Title: ' + result.taskTitle + ' has just been created by you <br> Your task is currently pending and will be due by ' + result.end_date + '.'
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
                            // console.log(info)
                            
                        }
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