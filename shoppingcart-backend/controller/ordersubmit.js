/* 
Creates an order from the shopping cart.
Deletes the shopping cart object
*/
const CartDB = require('../models/cart.js');
const OrderDB = require('../models/order.js');

const Cart = CartDB.getModel();
const Order = OrderDB.getModel();


module.exports =  async(req, res, next) => {
    let userID = req.userID
    let cart = await Cart.findOne({user: userID});

    let order = new Order({
        user: cart.user,
        totalPrice: cart.totalPrice,
        orderDate: Date.now(),
        orderStatus: "submitted",
        items: cart.items
      });

    await order.save();
    await cart.deleteOne();
    result =  order.toObject()
    res.status(201).json({orderID: result._id});

}

