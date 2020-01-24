const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const userRegModel = require('../../models/register');

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

//route for password change
router.post('/userPasswordChangeToken', isValidUser, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(400).json(err)
        } else {
            req.params = authData
            userRegModel.findOne({_id: req.params.user.id}, (err, result) => {
                if (err) {
                    return res.status(400).json(err)
                } else {
                    let mailOptions = {
                        from: GMAIL_USER,
                        to: 'inboxlegacy@gmail.com',
                        subject: 'Profile Password Change',
                        html: 'Hi ' + result.username + ', you requested for a password change. Use ' + '<b>'+ process.env.PASS_RESET_CODE + '</b>' + ' as your password change passcode.' + '<br>' + '<p>If you did not request for a password change, Kindly notify our technical service team.'
                    }
        
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error)
                        } else {
                            return res.status(200).json({
                                message: 'Pass Token sent Successfully'
                            
                            })
                        }
                    }) 
                }
            })
        }
    })
})

//route for password change after successful token
router.patch('/changeUserPassword', isValidUser, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(400).json(err)
        } else {
            req.params = authData
            userRegModel.findOne({_id: req.params.user.id}, (err, result) => {
                if (result) {
                    if (req.body.emailToken === process.env.PASS_RESET_CODE) {
                        bcrypt.hash(req.body.password, 15, (err, hash) => {
                            if (err) {
                                return res.status(501).json(err)
                            } else {
                                userRegModel.findByIdAndUpdate({_id: req.params.user.id}, 
                                    {$set: {password: hash, confirmPassword: hash}}, 
                                    {useFindAndModify: false}, (err, result) => {
                                        if (err) {
                                            return res.status(400).json(err)
                                        } else {
                                            process.env.PASS_RESET_CODE = Math.random(4)
                                            return res.status(200).json({
                                                message: 'Password Sucessfully Changed'
                                            })
                                        }
                                    })
                            }
                        })
                    } else {
                        return res.status(400).json({
                            message: 'Invalid Reset Token'
                        })
                    }
                } else {
                    return res.status(401).json(err)
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