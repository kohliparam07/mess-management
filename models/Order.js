const mongoose =require("mongoose")

const orderSchema = new mongoose.Schema({
    rollNo:Number,
    itemName:Array,
    quantity: Array,
    price: Array,
    status:Array,
    code:Array,
    total:Number
})

module.exports = mongoose.model('Order',orderSchema)