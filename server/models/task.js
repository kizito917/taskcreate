const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "register"
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    taskId: {
        type: String,
        require: true
    },
    taskTitle: {
        type: String,
        require: true,
        max: 50,
        min: 5
    },
    taskDesc: {
        type: String,
        require: true,
        max: 250
    },
    taskStatus: {
        type: String,
        require: true
    },
    start_date: {
        type: Date,
        require: true
    },
    end_date: {
        type: Date,
        require: true
    }
})

const taskModel = mongoose.model('task', taskSchema)

module.exports = taskModel