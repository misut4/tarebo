const express = require('express')
const router = express.Router()

const {
    getReview,
    getAllReview,
    createReview,
    updateReview,
    deleteReview,
    shareReview
} = require('../controller/review_controller')

router.get('/getReview', getReview)

router.get('/getAllReview', getAllReview)

router.post('/createReview', createReview)

router.post('/shareReview', shareReview)

router.put('/updateReview', updateReview)

router.delete('/deleteReview', deleteReview)

module.exports = router