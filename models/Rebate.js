const mongoose =require("mongoose")

const rebateSchema = new mongoose.Schema({
    rollNo:Number,
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    days:{
        type:Number,
        required:true,
        min:1
    },
    status:String,
    daysUsed:Number
})

module.exports = mongoose.model('Rebate',rebateSchema)