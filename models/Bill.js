const mongoose =require("mongoose")

const billSchema = new mongoose.Schema({
    rollNo:Number,
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    workingDays:{
        type:Number,
        required:true
    },
    dailyCost:{
        type:Number,
        required:true,
        min:1
    },
    rebateDays:Number,
    extrasCost:Number,
    total:Number
})

module.exports = mongoose.model('Bill',billSchema)