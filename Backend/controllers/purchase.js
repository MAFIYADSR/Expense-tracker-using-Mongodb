const Razorpay = require('razorpay');
const Order = require('../models/orders');
const userController = require('./user');

const purchasepremium = async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;

        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {

            if (err) {
                throw new Error(JSON.stringify(err));
            }

            const neworder = new Order({ orderid: order.id, status: 'PENDING', user: req.user._id });
            neworder.save().then(() => {

                // console.log("I am in PurchasePremium")

                return res.status(201).json({ order, key_id: rzp.key_id });

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err })
    }
}

const updateTransactionStatus = async (req, res) => {
    try {
        const userId = req.user._id;
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ orderid: order_id})

        const promise1 = Order.updateOne(
            { orderid: order._id },
            { $set: { paymentid: payment_id, status: 'SUCCESSFUL' } }
        );
        const promise2 = User.updateOne(
            { _id: req.user._id },
            { $set: { ispremiumuser: true } }
        );
        

        Promise.all([promise1, promise2]).then(() => {
            return res.status(202).json({ sucess: true, message: "Transaction Successfull", token: userController.generateAccessToken(userId, undefined, true) })
        }).catch((error) => {
            throw new Error(error)
        })

    }
    catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: 'Something went wrong' })
    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}