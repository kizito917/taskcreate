const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../../models/register');

//route for checking if user details exists during registration
router.get('/user_details', (req, res, next) => {
    userModel.findOne({username: req.body.username, email: req.body.email}, (err, data) => {
        if (data === null) {
            return res.status(200).json({
                message: 'No data Found , User can proceed with the details'
            })
        } else {
            return res.status(200).json({
                message: 'Email and username already exists',
                data
            })
        }
    })
})

//signup functionality route
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 15, (err, hash) => {
        if (err) {
            return res.status(400).json({
                message: 'Unable to hash password'
            })
        } else {
            userModel.findOne({username: req.body.username, 
                email: req.body.email}, (err, data) => {
                if (data === null) {
                    var userData = userModel({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        confirmPassword: hash,
                        created_dt: Date.now()
                    })
                    userData.save((err, done) => {
                        if (err) {
                            return res.status(400).json({
                                message:'Unable to Process User Registration'
                            })
                        } else {
                            return res.status(200).json({
                                message: 'User Registered Successfully'
                            })
                        }
                    })
                } else {
                    return res.status(200).json({
                        message: 'Email and username already exists',
                        data
                    })
                }
            })
        }
    })
})

//route for login functionality
router.post('/login', (req, res, next) => {
    userModel.findOne({username: req.body.username}, (err, result) => {
        if (result) {
            const user = {
				id: result._id,
				username: result.username,
				email: result.email
            }
            bcrypt.compare(req.body.password, result.password, (err, result) => {
                if (result === false) {
                    return res.status(403).json({
                        message: 'Incorrect password'
                    })
                } else {
                    jwt.sign({user}, process.env.SECRET_KEY, (err, token) => {
                        res.status(200).json(token)
                    })
                }
            })
        } else {
            return res.status(501).json({
                message: 'Not Implemented'
            })
        }
    })
})

//route for dashboard 
router.get('/dashboard', isValidUser, (req, res) => {
    return res.status(200).json(req.params)
})

//function to check for a valid user
function isValidUser(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		req.token = bearerHeader;
		jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
			if (err) {
				res.status(403).json({message: 'Unauthorized'})
			} else {
				res.status(200).json({
					message: 'Authorized request',
					authData
				})
				req.params = authData
				next();
			}
		})
		next();
	} else {
		res.status(403).json({
			message: 'Unauthorized request'
		})
	}
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
module.exports = router;