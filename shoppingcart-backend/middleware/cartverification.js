//Not currently in use
const CartDB = require('../models/cart.js');
const Cart = CartDB.getModel();

module.exports = {
    getOrCreateCart: async (req, res, next) => {
        let cart;
        try {
            cart = Cart.findOne({user: req.userID}).exec();

            if(!cart) {
                cart = new Cart({
                    user: req.UserID,
                    totalPrice: 0,  
                })
                await cart.save();
            }
        } catch(err) {
            console.log(err.stack);
            res.sendStatus(500);
            return;
        }
        req.cart = cart;
    }
}