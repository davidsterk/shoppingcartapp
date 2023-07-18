/*
Retrieves the customer's cart
*/
const CartDB = require('../models/cart.js');
const Cart = CartDB.getModel();


module.exports =  async(req, res) => {
    let userID = req.userID;
    let cart = await Cart.findOne({user: userID}).exec();
    if(!cart) {
        res.sendStatus(204);
        return;
    }
    let data = cart.toObject();
    let results = {cartID:  data.id};
    results.items = data.items.map( f => {
        return {
            id: f.product,
            quantityOrdered: f.quantityOrdered,
            name: f.productName,
            price: f.productPrice
        }
    });
    res.format( {
        "application/json": () => {
            res.status(200).json(results);
        }
    });

}

