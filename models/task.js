const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TaskSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    time: {
        type: String,
        default: 'All day'
    },
    color: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Task = mongoose.model("tasks", TaskSchema)