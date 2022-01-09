/*
Updates the cart stored in MongoDB
*/
const CartDB = require('../models/cart.js');
const {removeProductFromCart, addProductToCart, getProductFromCart} = require('../utils/cartutils')

const Cart = CartDB.getModel();

module.exports =  async(req, res) => {
    let userID = req.userID
    let product = req.product;
    let quantityRequested = req.body.quantity_requested;
    let cart = await Cart.findOne({user: userID}).exec();
    let message;

    if(Number.isNaN(quantityRequested) || quantityRequested) {
        res.status(400).json({message: "Invalid input"});
    }

    //check if product is in cart
    let cartProduct = await getProductFromCart(cart, product._id);
    
    if(quantityRequested == 0) {

        cart.totalPrice = cart.totalPrice - cartProduct.items.orderPrice;
        await removeProductFromCart(cart, product._id);
        await cart.save();

        product.quantity = product.quantity + cartProduct.items.quantityOrdered;
        await product.save();

        res.status(200).json({message: message});
        return;
    } 
    let orderDiff = Math.abs(cartProduct.items.quantityOrdered - quantityRequested);
    let orderPrice = quantityRequested * product.price;
    if (quantityRequested <  cartProduct.items.quantityOrdered) {

        await removeProductFromCart(cart, product._id);
        await addProductToCart(cart, product, quantityRequested, orderPrice);

        product.quantity = product.quantity + orderDiff
        await product.save();
        cart.totalPrice = cart.totalPrice - (product.price*orderDiff);
        await cart.save();

    } 
    else if(quantityRequested > cartProduct.items.quantityOrdered) {
        if((product.quantity - orderDiff) < 0 ) {
            //not enough inventory
            message = `Insufficient Inventory for ${product.name}, choose a quantity no more than ${product.quantity}`
            res.status(400).json({message: message});
            return;
        }
        else {
            product.quantity = product.quantity - orderDiff
            cart.totalPrice = cart.totalPrice + (product.price*orderDiff);
            await product.save();
            await cart.save();
    
            await removeProductFromCart(cart, product._id);
            await addProductToCart(cart, product, quantityRequested, orderPrice);
        }
    }
    message = "success"
    res.status(200).json({message: message});
}
