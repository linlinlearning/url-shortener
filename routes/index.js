const express = require('express')
const router = express.Router()

// include home and records
const home = require('./modules/home')

// direct requests with '/' to home 
router.use('/', home)

module.exports = router