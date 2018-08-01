let Order = require('./models/order');
let Customer = require('./models/customer');


var appRouter = function (app) {

    app.get("/order/getOrderByCutomer/:customerName", function (req, res) {
        const customerName = req.params.customerName;
        return Order.find({
            CustomerName: customerName
        })
            .then(result => {
                res.status(200).send(result);
            })
            .catch(error => {
                res.status(404).send(error);
            })
    });

    app.get("/order/getOrderByGivenAddress/:customerAddress", function (req, res) {
        const customerAddress = req.params.customerAddress;
        return Order.find({
            CustomerAddress: customerAddress
        })
            .then(result => {
                res.status(200).send(result);
            })
            .catch(error => {
                res.status(404).send(error);
            })
    });

    app.post("/order", function (req, res) {
        const orderValues = req.body;
        const query = { Name: orderValues.customerName }
        Customer.findOne(query, function (error, response) {
            if (error) throw err;
            if (!response || response.length === 0) {
                const newCustomer = new Customer({
                    Name: orderValues.customerName,
                    Address: orderValues.customerAddress
                });
                newCustomer.save()
                    .then((response) => {
                        const newOrder = new Order({
                            OrderId: orderValues.orderId,
                            CustomerAddress: orderValues.customerAddress,
                            CustomerName: orderValues.customerName,
                            Item: orderValues.item,
                            Price: orderValues.price,
                            Currency: orderValues.currency
                        });
                        newOrder.save(newOrder)
                            .then((response) => {
                                console.log(response);
                                res.status(200).send();
                            })
                            .catch((error) => {
                                console.log(error);
                                res.status(200).send();
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.send(400).send();
                    })
            } else {
                const newOrder = new Order({
                    OrderId: orderValues.orderId,
                    CustomerAddress: orderValues.customerAddress,
                    CustomerName: orderValues.customerName,
                    Item: orderValues.item,
                    Price: orderValues.price,
                    Currency: orderValues.currency
                });
                newOrder.save(newOrder)
                    .then((response) => {
                        console.log(response);
                        res.status(200).send();
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(200).send();
                    });
            }
        })
    });

    app.put("/order/:orderId", function (req, res) {
        const orderId = req.params.orderId;
        const orderValues = req.body;
        const myquery = { OrderId: orderId };

        Order.updateOne(myquery, {
            CustomerAddress: orderValues.customerAddress,
            CustomerName: orderValues.customerName,
            Item: orderValues.item,
            Price: orderValues.price,
            Currency: orderValues.currency
        })
            .then((response) => {
                console.log(response);
                res.status(200).send();
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    });

    app.delete("/order/:orderId", function (req, res) {
        const orderId = req.params.orderId;
        return Order.deleteOne({ OrderId: orderId })
            .then((response) => {
                console.log(response);
                return res.status(200).send();
            })
            .catch((error) => {
                return res.status(404).send(error);
            });
    });

    app.get("/order/getItems", function (req, res) {
        return Order.aggregate([
            { $group: { _id: "$Item", NumberOfTimesOrdered: { $sum: 1 } } },
            { $sort: { NumberOfTimesOrdered: -1, Item: -1 } }
        ]).then((response) => {
            console.log(response)
            res.status(200).send(response)
        })
            .catch((error) => {
                console.log(error);
                res.send(404).send(error);
            })
    });

    app.get("/customer/:customerName", function (req, res) {
        const customerName = req.params.customerName;
        return Customer.find({
            Name: customerName
        })
            .then(result => {
                res.status(200).send(result);
            })
            .catch(error => {
                res.status(404).send(error);
            })
    });

    app.put("/customer/:customerName", function (req, res) {
        const customerName = req.params.customerName;
        const myquery = { Name: customerName };
        const customerValue = req.body;

        Customer.updateOne(myquery, {
            Name: customerValue.name,
            Address: customerValue.address,
            Phone: customerValue.phone,
            Mobile: customerValue.mobile
        })
            .then((response) => {
                console.log(response);
                if (nModified === 0) {
                    res.status(404).send();
                }
                res.status(200).send();
            })
            .catch((error) => {
                res.status(400).send(error);
            });

    });

    app.delete("/customer/:customerName", function (req, res) {
        const customerName = req.params.customerName;
        const myquery = { Name: customerName };
        return Customer.deleteOne(myquery)
            .then((response) => {
                console.log(response);
                if (response.n === 0) {
                    res.status(404).send();
                }
                return res.status(200).send();
            })
            .catch((error) => {
                res.status(404).send(error);
            });
    });

    app.get("/customer/getAmountOfMoneyPaid/:customerName", function (req, res) {
        const customerName = req.params.customerName;

        Order.aggregate([
            { $match: { CustomerName: customerName } },
            { $group: { _id: "$Currency", total: { $sum: "$Price" } } },
            { $sort: { total: -1 } }
        ])
            .then((response) => {
                console.log(response);
                res.status(200).send(response)
            })
            .catch((error) => {
                console.log(error);
                res.status(404).send();
            });
    });

    app.get("/customer/getCustomersBoughtItem/:item", function (req, res) {
        const item = req.params.item;
        Order.distinct("CustomerName", { Item: item })
            .then((response) => {
                console.log(response);
                res.status(200).send(response)
            })
            .catch((error) => {
                console.log(error);
                res.status(404).send();
            });
    });
}
module.exports = appRouter;