const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

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

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})