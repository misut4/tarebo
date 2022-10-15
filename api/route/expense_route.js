const express = require('express')
const router = express.Router()

const {
    getExpense,
    getAllExpense,
    createExpense,
    updateExpense,
    deleteExpense
} = require('../controller/expense_controller')

router.get('/getExpense', getExpense)

router.get('/getAllExpense', getAllExpense)

router.post('/createExpense', createExpense)

router.put('/updateExpense', updateExpense)

router.delete('/deleteExpense', deleteExpense)

module.exports = router