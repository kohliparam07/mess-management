const mongoose = require("mongoose");

const pastBillSchema = new mongoose.Schema({
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    dailyCost:{
        type:Number,
        required:true
    },
    workingDays:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('PastBill',pastBillSchema);