const mongoose = require('mongoose')
const Joi = require('joi')

// creating the model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    }, 
    bio: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 1500
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 85
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1200
    },
    interest: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1200
    },
    image: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 18
    }, 
    country: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    }
})

// the model
const User = mongoose.model('Users', userSchema)

// input validation
const validateUser = (user) => {
    const schema = {
        username : Joi.string().min(3).max(100).required(),
        bio : Joi.string().min(50).max(1500).required(),
        email : Joi.string().email().min(3).max(100).required(),
        age : Joi.number().min(18).max(85).required(),
        password : Joi.string().min(3).max(150).required(),
        interest: Joi.string().required().min(5).max(1200),
        image : Joi.string().required(),
        phone : Joi.string().min(10).max(18).required(),
        country : Joi.string().min(3).max(100).required(),
    }

    return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser
exports.userSchema = userSchema