const mongoose =require("mongoose")

const complaintSchema = new mongoose.Schema({
    rollNo:Number,
    issue:{
        type:String,
        required:true
    },
    reply:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Complaint',complaintSchema)

