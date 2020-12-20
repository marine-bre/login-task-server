const express = require('express')
const router = express.Router();

const Task =  require('.././models/task.js')

//newTask route
router.post('/new', (req,res) => {
    const newTask = new Task({
        'userId': req.body.userId,
        'title': req.body.title,
        'description': req.body.description,
        'time': req.body.time,
        'color': req.body.color,
        'date': req.body.date,
    })
    newTask.save().then(res.json({newTask})).catch(res.status(400).json({error, message:'something went wrong'})) 
})


//retrieve task route
router.get('/allPosts', (req,res) => {
    let userId = req.body.userId
    let posts = [];
    Task.find({userId:userId})
    .then(result => res.json(result))
    .catch(err => res.status(400).json(err))
})

module.exports = router