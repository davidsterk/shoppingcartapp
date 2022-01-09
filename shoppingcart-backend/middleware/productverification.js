const ProductDB = require('../models/product.js');
const Product = ProductDB.getModel();
const validator = require('../utils/inputvalidation.js');

module.exports = {
    checkProductExistsByID:  async (req, res, next) => {
        let productID = req.params.product_id || req.body.product_id;
        let product;
        if(productID) {
            try {
                product = await Product.findById(productID).exec();
                if(!product) {
                res.status(404).json({message: "Unable to find Product"});
                return;
                }
            } catch (err) {
                res.sendStatus(500);
                console.log(err.stack);
                return;
            }
        }
        if(!product) {
            res.status(404).json({message: "Unable to find Product"});
            return;
        }
        else {
            req.product = product;
            next();
        }
    },
    checkProductExistsByName:  async (req, res, next) => {
        let productName = req.body.name || req.query.name;
        let product;
        if(productName) {
            try {
                product = await Product.findOne({name: productName}).exec();
   
            } catch (err) {
                res.sendStatus(500);
                console.log(err.stack);
                return;
            }
        }
        if (req.method == "PATCH" || req.method == "GET") {
            if(!product) {
                res.status(404).json({message: "Unable to find Product"});
                return;
            }
            else {
                res.product = product;
                next();
            }
            
        } else if(req.method == "POST") {
            if(!product) {
                next();
            }
            else {
                res.sendStatus(409);
                return;
            }
        } else {
            res.sendStatus(400);
            return;
        }
    },

    verifyProductParameters: async (req, res, next) => {
        let name = req.body.name;
        let description = req.body.description
        let quantity = req.body.quantity;
        let price = req.body.price;
        if (req.method == "PATCH") {
            if(
                validator.validateInputString(name,false) ||
                validator.validateInputString(description,false) ||
                validator.validateInputNumber(quantity,false) ||
                validator.validateInputNumber(price,false)
            ) {
                next();
            } else {
                res.sendStatus(400);
                return;
            }
        }
        else if(req.method == "POST") {
            if(
                validator.validateInputString(name,true) &&
                validator.validateInputString(description,true) &&
                validator.validateInputNumber(quantity,true) &&
                validator.validateInputNumber(price,true)
            ) {
                next();
            } else {
                res.sendStatus(400);
                return;
            }
        }
    }
};
