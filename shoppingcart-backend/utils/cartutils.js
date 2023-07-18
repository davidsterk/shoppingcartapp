/* DML for Mongo db carts */
const CartDB = require('../models/cart.js');

const Cart = CartDB.getModel();
const { ObjectId } = require('mongodb');

module.exports = {
    /* Removes product from cart items list */
    removeProductFromCart: async (cart, productID) => {
        await Cart.updateOne({ _id: cart._id},
            {$pull : { "items" : {"product":  productID} } } 
            );
    },
    /* adds product to cart items list */
    addProductToCart: async (cart, product, orderCount, orderPrice) => {
        await cart.updateOne( { $addToSet: { items: {product: product._id, 
            quantityOrdered: orderCount, productName: product.name, 
            productPrice: product.price, orderPrice: orderPrice}  }});
    },
    /* Get product from cart items list */
    getProductFromCart: async (cart, productID) => {
        let cartProductResult = await Cart.aggregate([
            { $match: {_id: new ObjectId(cart._id)}},
            { $unwind: "$items"},
            { $match: {"items.product": productID}}
        ])
        return cartProductResult[0];
    }
}