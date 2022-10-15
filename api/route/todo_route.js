const express = require('express')
const router = express.Router()

const {
    getTodo,
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controller/todo_controller')

router.get('/getTodo', getTodo)

router.get('/getAllTodo', getAllTodo)

router.post('/createTodo', createTodo)

router.put('/updateTodo', updateTodo)

router.delete('/deleteTodo', deleteTodo)

module.exports = router