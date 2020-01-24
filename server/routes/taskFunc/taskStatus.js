const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const taskModel = require('../../models/task');

//route for changing the task status of any created task
router.patch('/taskStatus/:id', isValidUser, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(400).json(err)
        } else {
            req.params = authData
            taskModel.findByIdAndUpdate({taskId: req.params.id}, 
                {$set: {taskStatus: req.body.taskStatus}}, {useFindAndModify: false}, 
                (err, result) => {
                    if (err) {
                        return res.status(400).json(err)
                    } else {
                        return res.status(200).json({
                            message: 'Status or task with id: ' + result.taskId + 'has been changed to ' + result.taskStatus + '.'
                        })
                    }
                })
        }
    })
})

//route to for user to delete task permanently from database
router.delete('/deleteTask/:id', isValidUser, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (!err) {
            taskModel.findByIdAndDelete({taskId: req.params.id}, {useFindAndModify: false}, 
            (err, result) => {
                if (result) {
                    return res.status(200).json({
                        message: 'Task deleted successfully',
                        result
                    })
                } else {
                    return res.status(403).json(err)
                }
            })
        } else {
            return res.status(400).json(err)
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