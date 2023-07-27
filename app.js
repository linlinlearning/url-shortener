// include packages
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// require routes
const routes = require('./routes')

// include Record model
const Record = require('./models/record.js')

/* include shorten function --> move to routes/modules/records.js
const shorten = require('./utils/shorten.js')
*/

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

// direct requests to routes
app.use(routes)

app.listen(port, () => {
    console.log(`App is running on localhost:${port}`)
})