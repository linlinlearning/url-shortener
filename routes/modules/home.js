const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const shorten = require('../../utils/shorten.js')

//define route for index page
router.get('/', (req, res) => {
    res.render('index')
})

//define route: generate a short URL
router.post('/', (req, res) => {
    const url_full = req.body.url_full

    // look up the input URL in the Record model 
    Record.findOne ({ url_full: url_full })
       .lean()
       .then((data) => {
        // if the input URL (url_full) is not in the database (the value of data is null)
        if(!data) {
            const randomCode = shorten()
            const url_short = `http://${req.headers.host}/${randomCode}`
            Record.create({
                url_full: url_full,
                url_short: url_short
            })
            .then(() => res.render('success', { url_full, url_short }))
            .catch(error => console.log(error))
        } else {
            res.render('success', { url_full, url_short: data.url_short })
        }         
    })
})    

// define route: redirect a short URL to the original URL
router.get('/:randomCode', (req, res) => {
    const randomCode = req.params.randomCode
    Record.findOne({ url_short: `http://${req.headers.host}/${randomCode}` })
        .lean()
        .then((data) => {
            // if the provided short URL is not in the database
            if(!data) {
                res.render('error', { errorURL: `http://${req.headers.host}/${randomCode}` })
            } else {
                res.redirect(data.url_full)
            }
        })
        .catch(error => console.error(error))
    })

module.exports = router