const ProductDB = require('../models/product.js');
const Product = ProductDB.getModel();

module.exports =  async (req , res) => {
    let product = req.product;
    try {
        await product.remove(); 
        res.sendStatus(200);   
    } catch(error) {
        res.sendStatus(500);
        console.log(error);
    }  
  };