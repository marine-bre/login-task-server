const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const validateUserInput = require('../validation/loginValidation.js')
const validateUserRegister = require('.././validation/register.js')

const User = require('.././models/user.js')


//register route
router.post('/register', async (req, res) => {
    console.log(req.body)
    //check if data is valid
    const isValid = validateUserRegister(req.body);
    if (!isValid) {
        return res.status(400).json({
            status: 'error',
            message: 'The data did not pass validation'
        })
    }
    //check if email taken
    const user = await User.findOne({ 'email': req.body.email })
    if (user) {
        return res.status(400).json({
            status: 'error',
            message: 'This email is already registered'
        })
    }

    //hash password
    console.log('password:', req.body.password)
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    //create new user
    const newUser = new User({
        'name': req.body.name,
        'email': req.body.email,
        'password': hashedPassword
    });

    newUser.save().then(
        res.json({newUser}))
        .catch(res.status(400).send({ error }))

})

//login route

router.post('/login', async (req, res) => {

    //check if data is valid
    const { error } = validateUserInput(req.body);
    if (error) { return res.status(400).json(error) }
    //check if user exists
    else {console.log('data is valid')}
    const user = await User.findOne({ 'email': req.body.email })
    res.send(user)
    if (!user) { return res.status(404).json({error, message:'Email not found'}) }
    //check password 
    const checkPassword = await bcrypt.compare(req.body.password, user.password)
    if (!checkPassword) { return res.status(400).json({error, message:'Wrong password'}) }
    res.send('logged in!')

})

module.exports = router