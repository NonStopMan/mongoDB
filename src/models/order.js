const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    OrderId: {
        type : Number,
        required:true,
    },
    CustomerName: String,
    CustomerAddress: String,
    Item: String,
    Price: Number,
    Currency: String
})
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;