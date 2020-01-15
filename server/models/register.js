const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    confirmPassword: {
        type: String,
        required: true,
        max: 100,
        min: 6
    },
    created_dt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const modelSchema = mongoose.model('user', userSchema)

module.exports = modelSchema