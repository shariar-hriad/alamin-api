const express = require('express')
require('dotenv').config()
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')
const routes = require('./routes/index')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Welcome to API' })

    next()
})

app.use('/api/v1', routes)

const PORT = process.env.PORT || 8060

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB Connected')
        app.listen(PORT, () => {
            console.log(`Server is running ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
