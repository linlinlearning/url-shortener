const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = mongoose.Schema({
    url: {
        type: String,
        require: true
    },
    url_short: {
        type: String,         
    }
})

module.exports = mongoose.model('Record', recordSchema)
