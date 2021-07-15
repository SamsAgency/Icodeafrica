const mongoose = require('mongoose')
const Joi = require('joi')

// creating the model
const authorSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1200
    },
    topic: {
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
    experience : {
        type: Number,
        required: true,
        maxlenth: 50,
        minlength: 3
    },
    country : {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    }
})

// the model
const Author = mongoose.model('Author', authorSchema)

// input validation 
const validateAuthor = (author) => {
    const schema = {
        username: Joi.string().required().min(5).max(100),
        bio: Joi.string().required().min(50).max(1500),
        image: Joi.string().required(),
        email: Joi.string().email().required().min(5).max(100),
        experience: Joi.number().required().min(3).max(50),
        country: Joi.string().required().min(3).max(100),
        topic: Joi.string().required().min(5).max(1200),
        phone: Joi.string().required().min(10).max(18),
        password: Joi.string().required().min(8).max(100),
    }

    return Joi.validate(author, schema)

}

exports.Author = Author
exports.validate = validateAuthor
exports.authorSchema = authorSchema