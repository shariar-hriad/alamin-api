const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    },
})

userSchema.statics.signup = async function (username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    const exists = await this.findOne({ username })

    if (exists) {
        throw Error('Username is already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create({
        username,
        password: hashedPassword,
    })

    return user
}

userSchema.statics.login = async function (username, password) {
    if (!username || !password) {
        throw Error('All fileds must be filled')
    }

    const user = await this.findOne({ username })

    if (!user) {
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User
