const mongoose = require('mongoose')
const Record = require('../record.js')
const seeder = require('../url.json')
const seederData = seeder.results
const shorten = require('../shorten.js')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => {
  for(let i = 0; i < seederData.length; i++) {
    const url_short = shorten()
    Record.create({
      url: seederData[i].url,
      url_short: url_short
    })
  }
  console.log('done!')
})
 
