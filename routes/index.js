const express = require('express')

const userRoute = require('./user')
const todoRoute = require('./todo')

const router = express.Router()

router.use('/user', userRoute)
router.use('/todo', todoRoute)

module.exports = router
