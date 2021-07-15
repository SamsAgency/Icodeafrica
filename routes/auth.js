const express = require('express')
const router = express.Router()
const Joi = require('joi')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const {User} = require('../models/user')

// login endpoint
router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password!')

    res.send(true)
})


// validating the request
const validate = (req) => {
    const schema = {
        email: Joi.string().required().email().min(5).max(150),
        password: Joi.string().required().min(8).max(100)
    }

    return Joi.validate(req, schema)
}

// exports
module.exports = router