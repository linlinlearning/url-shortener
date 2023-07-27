const express = require('express')
const router = express.Router()

// include home and records
const home = require('./modules/home')
const records = require('./modules/records')

// direct requests with '/' to home 
router.use('/', home)

// direct requests with '/records' to records 
router.use('/records', records)

module.exports = router