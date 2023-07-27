const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')

//define route for index page
router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router