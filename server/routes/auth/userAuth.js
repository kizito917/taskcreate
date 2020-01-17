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
      //check password match with confirm password
    if(password !== confirmPassword) {
      return res.json({
        error: "Your passwords do not match"
      })
    }
  }).catch(err => {
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
    const token = jwt.sign({email}, process.env.SECRET, {expiresIn: '1h'})
    const user = new User({
      username,
      email,
      password: hash
    })
    user.save()
    .then((user)=>{
      return res.json({
        message: 'User Created',
        token
      })
    }).catch(err =>{
      return res.json({
        error: 'An error occurred during registeration. Please try again '
      })
    })
  }) // end bcrypt hashing
      
})

router.post('/login', (req,res) =>{
  const { email, password } = req.body
  User.findOne({email})
  .then(user =>{
    if(!user) {
      return res.json({
        message: 'No user registered with this email'
      })
    }
    bcrypt.compare(password, user.password,(err,resp)=>{
      if(!resp) {
        return res.json({
          error: 'Invalid email or password'
        })
      }

      const token = jwt.sign({
        email
      }, process.env.SECRET, {expiresIn: '1h'})

      return res.json({
        message: 'Login Success',
        token
      })
    })
  })
  .catch(error =>{
    return res.json({
      error: error
    })
  })
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
module.exports = router;