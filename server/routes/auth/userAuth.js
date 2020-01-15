const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/register');

//signup functionality route
router.post('/signup', (req, res, next) => {
  let { username, email, password, confirmPassword } = req.body

  User.findOne({email})
  .then((user) =>{
    if(user) {
      return res.json({
        message: 'A user with email already exists'
      })
    }
  })
  .catch(err => {
    return res.json({
      error: "An error occurred. Please try again"
    })
  })

  bcrypt.hash(password, 10, (err,hash)=>{
    if(err) {
      return res.json({
        error: "An error occurred. Please try again"
      })
    }
    const user = new User({
      username,
      email,
      password: hash
    })
    user.save()
    .then((user)=>{
      return res.json({
        message: 'User Created'
      })
    })
    .catch(err =>{
      return res.json({
        error: 'An error occurred during registeration. Please try again '
      })
    })
  }) // end bcrypt hashing
      
})

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
module.exports = router;