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
})


//reset password
router.post('/reset_password', (req,res)=> {
	const { email } = req.body
	userRegModel.findOne({email}, (err,user)=>{
		if(err) {
			return res.status(400).json({
			    message:'Unable to process this information at the moment'
			})
		}
		if(!user) {
			return res.status(400).json({
				message: 'No user with the associated email'
			})
		}
		//generate password reset token
		user.passwordReset()

		user.save((err,user) => {
			if(err) {
				return res.status(500).json({
					message: err.message
				})
			}

			const link = `https://${req.headers.host}/auth/password_reset/${user.resetPasswordToken}`

			const mailOptions = {
				from: GMAIL_USER,
				to: 'johnkingsley917@gmail.com',
				subject: 'Password Reset',        
        text: `Hi ${user.username}
			    Please click on the following link ${link} to reset your password. Link expires after one(1) hour
			    If you did not request for this change, please ignore this email`,
    	}
    	transporter.sendMail(mailOptions, (error, info) => {
  	    if (error) {
  	      return console.log(error)
  	    }else {
	        return res.status(200).json({
	            message: 'Password Reset Has Been Sent To Your Email'
	        
	        })
  	    }
    	}) 
		})
		
	})
})

module.exports = router