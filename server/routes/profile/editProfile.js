const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userRegModel = require('../../models/register');

//route to edit profile of user
router.patch('/edit_profile_username', isValidUser, (req, res) => {
    globalUser = req.body.username
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(400).json(err)
        } else {
            req.params = authData
            userRegModel.findById({_id: req.params.user.id}, (err, result) => {
                if (result) {
                    userRegModel.findOne({username: globalUser}, (err, result) => {
                        if (result === true) {
                            return res.status(400).json({
                                errMsg: 'Username exists!!!.... Pick another username'
                            })
                        } else {
                            userRegModel.findOneAndUpdate({_id: req.params.user.id},
                                 {$set: {username: globalUser}}, {useFindAndModify: false},
                                  (err, result) => {
                                     if (err) {
                                         return res.status(400).json(err)
                                     } else {
                                         return res.status(200).json({
                                             message: 'Profile Username Updated Successfully'
                                         })
                                     }
                                 })
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: 'Unable to find User Data'
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