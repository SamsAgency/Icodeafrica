const mongoose = require('mongoose')
const Joi = require('joi')

// the schema
const exerciseSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 255,
        trim: true
    },
    difficultyLevel: {
        type: String,
        min: 1,
        max: 5
    },
    question : {
        type: String,
        minlength: 10,
        maxlength: 2000
    }
})

// the model
const Exercise = mongoose.model('Exercises', exerciseSchema)

// validating the exercise
const validateExercise = (exercise) => {
    const schema = {
        title: Joi.string().required().min(20).max(255),
        difficultyLevel: Joi.string().required()
    }
}