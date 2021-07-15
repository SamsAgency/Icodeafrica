const express = require('express')
const {User, validate} = require('../models/user')
const bcrypt = require('bcrypt')
const router = express.Router()

// get request
router.get('/',async (req, res) =>{
    try{
        const users = await User.find()
        if (!users) return res.status(404).send('No user with such ID')
        res.send(users)
    }
    catch(er){
        console.log(err)
    }
})

// get by id
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).send('No user with such ID')
    res.send(user)
})

// post request
router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const email = await User.findOne({email : req.body.email})
    if (email) return res.status(400).send('That user exists')

    let user = new User({
        username : req.body.username,
        bio : req.body.bio,
        image : req.body.image,
        email : req.body.email,
        phone : req.body.phone,
        age : req.body.age,
        country : req.body.country,
        password : req.body.password,
        interest : req.body.interest
    })

    // hashing passwords
    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        
        user = await user.save()
        res.send(user)
    }
    catch(er){
        console.log(er)
    }
})

// put request
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate(req.params.id, {
        $set : {
            username : req.body.username,
            bio : req.body.bio,
            image : req.body.image,
            email : req.body.email,
            phone : req.body.phone,
            age : req.body.age,
            country : req.body.country,
            password : req.body.password,
            interest : req.body.interest
        }
    })


    if (!user) return res.status(404).send('That user does not exists')

    // hashing passwords
    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    
        res.send(user)
    }
    catch(er){
        console.log(er)
    }
})

// delete request
router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id)
    if (!user) return res.status(404).send('That user does not exists')
    res.send(user)
})

// exports
module.exports = router