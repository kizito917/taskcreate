const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userRegModel = require('../../models/register');

//route for password change
router.patch('/changeUserPassword', isValidUser, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(400).json(err)
        } else {
            req.params = authData
            userRegModel.findOne({_id: req.params.user.id}, (err, result) => {
                if (err) {
                    return res.status(400).json(err)
                } else {
                    bcrypt.compare(req.body.password, result.password, (err, decode) => {
                        console.log(decode)
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