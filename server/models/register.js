const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        max: 200,
        min: 5,
        trim: true
    },
    email: {
        type: String,
        required: true,
        max: 200,
        trim: true, 
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: String,
        required: true,
        max: 100,
        min: 6
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpiryTime: {
        type: Date,
    },
    created_dt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

userSchema.methods.passwordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

mongoose.set('useFindAndModify', false);

const modelSchema = mongoose.model('user', userSchema)

module.exports = modelSchema