const express = require('express')
const todoController = require('../controllers/todo.controller')

const router = express.Router()

router.post('/add-todo', todoController.add_todo)
router.get('/', todoController.get_todo)
router.delete('/:id', todoController.delete_todo)

module.exports = router
