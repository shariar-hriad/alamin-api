const Todo = require('../model/todo.model')
const responseHandler = require('../handlers/response.handler')
const mongoose = require('mongoose')

const todoController = {}

todoController.add_todo = async (req, res) => {
    const { todo } = req.body

    try {
        const new_todo = await Todo.create({ todo })

        responseHandler.created(res, { new_todo })
    } catch {
        responseHandler.error(res)
    }
}

todoController.get_todo = async (req, res) => {
    try {
        const todos = await Todo.find({})
        responseHandler.ok(res, todos)
    } catch {
        responseHandler.error(res)
    }
}

todoController.delete_todo = async (req, res) => {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such Todo' })
        }

        const todo = await Todo.findOneAndDelete({ _id: id })

        if (!todo) {
            return res.status(400).json({ error: 'No such workout' })
        }

        responseHandler.ok(res, todo)
    } catch {
        responseHandler.error(res)
    }
}

module.exports = todoController
