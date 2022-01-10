/* 
Updates existing product
*/
const ProductDB = require('../models/product.js');
const Product = ProductDB.getModel();

module.exports = async (req , res) => {
    let product = req.product;
    try {
        if(updateProduct(req.body, product)) {
            await product.save();
            res.sendStatus(200);
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        res.sendStatus(500);
        console.log(err.stack);
        return;
    }
};

function updateProduct(body, product){
    if(body.name || body.description || body.quantity || body.price) {
        if(body.name) {
                product.name = body.name;
            }
        else if (body.description) {
            product.description = body.description;
            }
        else if (body.quantity) {
            product.quantity = body.quantity;
            }
        else if (body.price) {
            product.price = body.price;
        }
        return true;   
    }
    return false;
 }
