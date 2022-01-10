/*
Adds products to the customer's carts.
If the product already exists in the cart, then update. 
If quantity requested exceeds product quantity then do not update cart
*/
const productDB = require('../models/product.js')
const CartDB = require('../models/cart.js');
const Cart = CartDB.getModel();
const {removeProductFromCart, addProductToCart, getProductFromCart} = require('../utils/cartutils')


module.exports =  async(req, res) => {
    let userID = req.userID;
    let product = req.product
    let quantityRequested = req.body.quantity_requested;
    let cart;
    let message;
    if(quantityRequested <= product.quantity) {
        
        cart = await Cart.findOne({user: userID}).exec();
        //check if shopping cart exists for user
        if(!cart) {
 
            cart = new Cart({
                user: userID,
                totalPrice: 0,  
            })
            await cart.save();
        }
        //check if product is in cart
        let cartProduct = await getProductFromCart(cart, product._id);
        if (!cartProduct) {
            let orderPrice = quantityRequested*product.price;
            await addProductToCart(cart, product, quantityRequested, orderPrice);

            cart.totalPrice = cart.totalPrice + orderPrice;
            await cart.save();

            product.quantity = product.quantity - quantityRequested;
            await product.save()
        } else {
            let newOrderCount = cartProduct.items.quantityOrdered + quantityRequested;
            let orderPrice = newOrderCount * product.price
         
            await removeProductFromCart(cart, product._id);
            await addProductToCart(cart, product, newOrderCount, orderPrice);

            product.quantity = product.quantity - quantityRequested;
            cart.totalPrice = (cart.totalPrice - cartProduct.items.orderPrice) + (newOrderCount*product.price);
            await product.save();
            await cart.save();

        }
        message = "success"
    } else {
        message = `Insufficient Inventory for ${product.name}, choose a quantity no more than ${product.quantity}`
    }

    res.json({message: message})

    
}
