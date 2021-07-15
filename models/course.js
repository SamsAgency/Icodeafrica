const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId= require('joi-objectid')(Joi)

// schema
const courseSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 255,
        maxlength: 2000
    },
    image: {
        type: String,
        required: true,
        maxlength: 255
    },
    videos: {
        type: String,
        maxlength: 255
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
})

// the model
const Course = mongoose.model('Courses', courseSchema)

// validation
const courseValidation = (course) => {
    const schema = {
        title: Joi.string().min(5).max(100),
        description: Joi.string().min(255).max(2000),
        image: Joi.string().required().max(255),
        videos: Joi.string().max(255),
        authorId: Joi.objectId().required()
    }

    return Joi.validate(course, schema)
}

exports.Course = Course
exports.validate = courseValidation
exports.courseSchema = courseSchema