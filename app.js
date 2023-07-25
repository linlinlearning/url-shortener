const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// include Record model
const Record = require('./models/record.js')

// include shorten function
const shorten = require('./models/shorten.js')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config() 
  }

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected!') })
  
const app = express()
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


// define route for index page
app.get('/', (req, res) => {
    res.render('index')
})

// define route for adding a URL
app.post('/records', async (req, res) => {
    const url_full = req.body.url_full
    const result = await Record.find({ url_full: url_full}).exec()

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