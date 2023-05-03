const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const responseHandler = require('../handlers/response.handler')
const { response } = require('express')

const requireAuth = async (req, res, next) => {
    // verify user is authenticated
    const { authorization } = req.headers

    if (!authorization) {
        return responseHandler.unauthorize(res)
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY)

        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch {
        responseHandler.error(res)
    }
}

module.exports = requireAuth
