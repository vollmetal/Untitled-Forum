const express = require('express')
const app = express()
const cors = require('cors')
global.mongoose = require('mongoose')
global.bcrypt = require('bcryptjs')

app.use(express.json())
app.use(cors())

require('dotenv').config()


const userRoutes = require('./routes/users')
app.use('/user', userRoutes)


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dj2mwtq.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true},
    (error) => {
        if(error) {
            console.log(error)
        } else {
            console.log('Successfully connected to MongoDB Database')
        }
    })

app.listen(4200, () => {
    console.log('server start!')
})