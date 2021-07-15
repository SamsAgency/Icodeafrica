const {Course, validate} = require('../models/course')
const express = require('express')
const router = express.Router()
const {Author} = require('../models/author')


// get request
router.get('/', async (req, res) => {
    try{
        const courses = await Course.find()
            .populate('author', 'name -_id')
        if (!courses) return res.status(404).send('No such course item')
        res.send(courses)
    } 
    catch(er){
        console.log(er)
    }
})

// get by id
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        if (!course) return res.status(404).send('That course Does not exist')
        res.status(course)
    }
    catch(er){
        console.log(er)
    }
})

// post 
router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const title = await Course.findOne({title : req.body.title})
    if (title) return res.status(400).send('That user exists')

    const author = await Author.find()
    if (!author) return res.status(404).send('No such Author')

    let course = new Course({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        videos: req.body.videos,
        author: {
            _id: author._id
        }
    })

    try {
        course = await course.save()
        res.send(course)
    } 
    catch(er){
        console.log(er)
    }
})

// put request
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const course = await Course.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            videos: req.body.videos,
        }
    })

    if (!course) return res.status(404).send('No such course')
    res.send(course)
})

// delete
router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id)
    if (!course) res.status(404).send('No such Course')
})


// exports
module.exports = router