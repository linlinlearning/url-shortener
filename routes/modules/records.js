const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const shorten = require('../../utils/shorten.js')

//define route for adding a URL
router.post('/', async (req, res) => {
    const url_full = req.body.url_full
    
    // look up the input URL in the Record model 
    const result = await Record.find({ url_full: url_full}).exec()

    // if the input URL exists: use its short URL; else: use the shorten function to generate a short URL
    if (result.length > 0) {
        const foundData = result[0]
        res.render('success', { url_full: url_full, url_short: foundData.url_short})
    } else {
        const url_short = shorten()
        await Record.create({ 
            url_full: url_full,
            url_short: url_short 
        })  
            .then(() => res.render('success', { url_full, url_short })) 
            .catch(error => console.log(error))
    } 
})

module.exports = router