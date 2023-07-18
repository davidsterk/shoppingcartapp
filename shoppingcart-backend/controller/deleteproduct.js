/* 
Delets a Product in mongodb. Only allowed by users with admin role
*/
const ProductDB = require('../models/product.js');
const Product = ProductDB.getModel();

module.exports =  async (req , res) => {
    let product = req.product;
    try {
        await product.deleteOne(); 
        res.sendStatus(200);   
    } catch(error) {
        res.sendStatus(500);
        console.log(error);
    }  
  };