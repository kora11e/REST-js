const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        default: 'brak hasha'
    }
})
module.exports = {bookModel:mongoose.model('books', bookSchema)}