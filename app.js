const express = require('express')
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected!') })
  
const app = express()

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello user!')
})

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})