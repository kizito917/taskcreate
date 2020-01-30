const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskCommentSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "register"
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    taskId: {
        type: String,
        ref: "task"
    },
    taskTitle: {
        type: String,
        require: true,
        max: 50,
        min: 5
    },
    taskComment: {
        type: Array,
        require: true
    }
})

const taskCommentModel = mongoose.model('taskComment', taskCommentSchema)

module.exports = taskCommentModel