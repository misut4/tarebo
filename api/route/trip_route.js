const express = require('express')
const router = express.Router()

const {
    getTrip,
    getAllTrip,
    createTrip,
    updateTrip,
    deleteTrip
} = require('../controller/trip_controller')

router.get('/getTrip', getTrip)

router.get('/getAllTrip', getAllTrip)

router.post('/createTrip', createTrip)

router.put('/updateTrip', updateTrip)

router.delete('/deleteTrip', deleteTrip)

module.exports = router