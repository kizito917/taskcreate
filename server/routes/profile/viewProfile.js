const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userDataModel = require('../../models/register');

//route to enable fetching of users profile informations
router.get('/my_profile_info', isValidUser, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(400).json(err)
        } else {
            req.params = authData
            userDataModel.findById({_id: req.params.user.id}, (err, result) => {
                if (result != null) {
                    return res.status(200).json({
                        message: 'Profile details successfully fetched',
                        result
                    })
                } else {
                    return res.status(400).json({
                        errMsg: 'Wooooooooooooooooooooooooo'
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