const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const taskModel = require('../../models/task');

//route for user to create a task 
router.post('/create_task', isValidUser, (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(400).json({
                message: 'Unable to process request'
            })
        } else {
            req.params = authData
            const userTaskDetails = {
                user_id: req.params.id,
                username: req.params.username,
                email: req.params.email,
                taskId: req.body.taskId,
                taskTitle: req.body.taskTitle,
                taskDesc: req.body.taskDesc,
                taskStatus: 'pending',
                start_Date: req.body.startDate,
                end_date: req.body.endDate
            }
            userTaskDetails.save((err, done) => {
                if(err) {
                    return res.status(400).json({
                        message: 'Unable to create task'
                    })
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