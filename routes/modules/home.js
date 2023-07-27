const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const shorten = require('../../utils/shorten.js')

//define route for index page
router.get('/', (req, res) => {
    res.render('index')
})

//define route for adding a URL
router.post('/', async (req, res) => {
    const url_full = req.body.url_full

    // look up the input URL in the Record model 
    const result = await Record.find({ url_full: url_full }).exec()

    // if the input URL exists: use its short URL; else: use the shorten function to generate a short URL
    if (result.length > 0) {
        const foundData = result[0]
        res.render('success', { url_full: url_full, url_short: foundData.url_short })
    } else {
        const randomCode = shorten()
        const url_short = `http://${req.headers.host}/${randomCode}`
        await Record.create({
            url_full: url_full,
            url_short: url_short
        })
            .then(() => res.render('success', { url_full, url_short }))
            .catch(error => console.log(error))
    }
})

// define route to redirect a shortened URL to the original URL
router.get('/:randomCode', (req, res) => {
    const randomCode = req.params.randomCode
    Record.findOne({ url_short: `http://${req.headers.host}/${randomCode}` })
        .lean()
        .then((data) => {
            res.redirect(data.url_full)
        })
        .catch(error => console.error(error))
})

module.exports = router