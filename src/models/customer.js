const mongoose = require('mongoose');

const Order = require('./order');
const Schema = mongoose.Schema;


const CustomerSchema = new Schema({
    Name: String,
    Address: String,
    Phone: String,
    Mobile: String
})

CustomerSchema.virtual('Orders').get(function () {
    return
    Order.find({
        CustomerName : this.Name
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
});
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;