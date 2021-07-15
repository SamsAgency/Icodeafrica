const express = require('express')
const {Author, validate} = require('../models/author')
const bcrypt = require('bcrypt')
const router = express.Router()

// get request
router.get('/',async (req, res) =>{
    try{
        const authors = await Author.find()
        if (!authors) return res.status(404).send('No author with such ID')
        res.send(authors)
    }
    catch(er){
        console.log(er)
    }
})

// get by id
router.get('/:id', async (req, res) => {
    const author = await Author.findById(req.params.id)
    if (!author) return res.status(404).send('No author with such ID')
    res.send(user)
})

// post request
router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const email = await Author.findOne({email : req.body.email})
    if (email) return res.status(400).send('That user exists')

    let author = new Author({
        username : req.body.username,
        bio : req.body.bio,
        image : req.body.image,
        email : req.body.email,
        phone : req.body.phone,
        experience : req.body.experience,
        country : req.body.country,
        topic : req.body.topic,
        phone: req.body.password,
        password : req.body.password
    })

    // hashing passwords
    try {
        const salt = await bcrypt.genSalt(10)
        author.password = await bcrypt.hash(author.password, salt)
        
        author = await author.save()
        res.send(author)
    }
    catch(er){
        console.log(er)
    }
})

// put request
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const author = await Author.findByIdAndUpdate(req.params.id, {
        $set : {
            username : req.body.username,
            bio : req.body.bio,
            image : req.body.image,
            email : req.body.email,
            phone : req.body.phone,
            experience : req.body.experience,
            country : req.body.country,
            topic : req.body.topic,
            phone: req.body.password,
            password : req.body.password
        }
    })
    
    
    if (!author) return res.status(404).send('That author does not exists')
    
    // hashing passwords
    try {
        const salt = await bcrypt.genSalt(10)
        author.password = await bcrypt.hash(author.password, salt)
        
        res.send(author)

    }
    catch(er){
        console.log(er)
    }
})

// delete request
router.delete('/:id', async (req, res) => {
    const author = await Author.findByIdAndRemove(req.params.id)
    if (!author) return res.status(404).send('That author does not exists')
    res.send(author)
})

// exports
module.exports = router