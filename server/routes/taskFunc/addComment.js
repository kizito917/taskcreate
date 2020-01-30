const expres = require('express');
const router =  express.Router();
const jwt = require('jsonwebtoken');
const taskModel = require('../../models/task');
// const taskCommentModel = require('../../models/taskComment');

//route for commenting on a created task
router.post('/createComment', isValidUser, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(400).json({
                message: 'unable to process request'
            })
        } else {
            req.params = authData
            taskModel.findOne({user_id: req.params.user.id, 
                taskId: req.body.taskId, taskTitle: req.body.taskTitle}, (err, result) => {
                    if (err) {
                        return res.status(400).json(err)
                    } else {
                        comment = req.body.text
                        const submittedComment = taskModel({
                            taskComments: comment
                        })
                        submittedComment.save((err, result) => {
                            return res.status(200).json(result)
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