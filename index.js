const express = require('express')
const app = express()
const mongoose = require('mongoose')
const users = require('./routes/users')
const author = require('./routes/author')
const courses = require('./routes/courses')
const auth = require('./routes/auth')

// middlewares
app.use(express.json())
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/authors', author)
app.use('/api/courses', courses)

// connecting
mongoose.connect('mongodb://localhost/icodeafrica',  {useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => console.log('Connected to the database...'))
    .catch(er => console.log(er))

//listening to a given port
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`connected to port port ${port}...`))

