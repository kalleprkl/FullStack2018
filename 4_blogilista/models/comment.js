const mongoose = require('mongoose')

const Comment = mongoose.model('Comment', {
    content: String,
    blog: String
})

module.exports = Comment

