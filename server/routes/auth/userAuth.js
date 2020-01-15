const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../../models/register');

//signup functionality route
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 15, (err, hash) => {
        if (hash) {
            res.status(200).json(hash)
        } else {
            console.log(err)
        }
    })
    // const userDetails = {
    //     username: req.body.username,
    //     email: req.body.email,
        
    // }
})

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
module.exports = router;