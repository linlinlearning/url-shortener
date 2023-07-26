// include packages
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// include Record model
const Record = require('./models/record.js')

// include shorten function
const shorten = require('./utils/shorten.js')

// database-related settings 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config() 
  }
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected!') })

// create the app server
const app = express()
const port = 3000

// use view engine 'express-handlebars' ('hbs')
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// use the static files in folder 'public'
app.use(express.static('public'))

// use body-parser to process form contents
app.use(bodyParser.urlencoded({ extended: true }))

// define route for index page
app.get('/', (req, res) => {
    res.render('index')
})

// define route for adding a URL
app.post('/records', async (req, res) => {
    const url_full = req.body.url_full
    
    // look up the input URL in the Record model 
    const result = await Record.find({ url_full: url_full}).exec()

    // if the input URL exists, use its short URL; else, use the shorten function to generate a short URL
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

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})