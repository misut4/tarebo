const express = require('express')
const router = express.Router()

const {
    getPlan,
    getAllPlan,
    createPlan,
    updatePlan,
    deletePlan
} = require('../controller/plan_controller')

router.get('/getPlan', getPlan)

router.get('/getAllPlan', getAllPlan)

router.post('/createPlan', createPlan)

router.put('/updatePlan', updatePlan)

router.delete('/deletePlan', deletePlan)

module.exports = router