const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const responseHandler = require('../handlers/response.handler')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' })
}

const userController = {}

userController.signupUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.signup(username, password)

        // create a token
        const token = createToken(user._id)

        responseHandler.created(res, { username, token })
    } catch {
        responseHandler.error(res)
    }
}

userController.loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.login(username, password)

        // create a token
        const token = createToken(user._id)

        responseHandler.ok(res, { username, token })
    } catch (error) {
        console.log(error)
        responseHandler.error(res)
    }
}

module.exports = userController
