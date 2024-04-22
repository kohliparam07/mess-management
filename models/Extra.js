const mongoose = require('mongoose')

const extraSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    }
})


const Model = mongoose.model('Extra', extraSchema)
Model.init()
module.exports = Model

