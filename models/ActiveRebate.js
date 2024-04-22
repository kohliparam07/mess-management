const mongoose =require("mongoose")

const activeRebateSchema = new mongoose.Schema({
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

module.exports = mongoose.model('ActiveRebate',activeRebateSchema)