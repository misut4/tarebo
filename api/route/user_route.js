const express = require('express')
const router = express.Router()

const {
    getUser,
    getAllUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controller/user_controller')

router.get('/getUser', getUser)

router.get('/getAllUser', getAllUser)

router.post('/createUser', createUser)

router.put('/updateUser', updateUser)

router.delete('/deleteUser', deleteUser)

module.exports = router