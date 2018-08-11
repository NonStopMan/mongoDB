const assert = require('assert');
const Order = require('../src/models/order');
const mongoose = require('mongoose');

before((done) => {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost:27017/borderguru_orders", {
        "auth": { "authSource": "admin" },
        "user": "admin",
        "pass": "admin",
        useNewUrlParser: true
    })
        .then(() => {
            console.log('Mongoooose connected')
            done();
        })
        .catch((err) => {
            console.log(err);
        })
})

describe('Creating Orders', () => {
    beforeEach((done) => {
        const newOrder = new Order({
            OrderId: 1,
            CustomerName: 'mohammed Thabet',
            CustomerAddress: 'King Faisal Street',
            Item: 'Labtop',
            Price: 1700,
            Currency: 'USD'
        });
        newOrder.save()
            .then(() => {
                done()
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it('finds all the order related to customer mohammed', (done) => {
        Order.find({ CustomerName: 'mohammed Thabet' })
            .then((users) => {
                console.log(users);
                done();
            });
    })
})