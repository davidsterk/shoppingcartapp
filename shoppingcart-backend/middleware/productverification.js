/*
Middleware to verify product inputs
*/
const ProductDB = require('../models/product.js');
const Product = ProductDB.getModel();
const validator = require('../utils/inputvalidation.js');

module.exports = {
/*
checkProductExistsByID checks if the productID matches a product.
Sends status 404 if not found otherwise sends the product object to the business layer
*/
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
/*
checkProductExistsByName checks if the name already exists for the product.
If request method is PATCH/GET then if product does not exist return 404 otherwise return product
If request method is POST then if product does not exist then go to business layer otherwise return 409 or 400
*/
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
        //get or update
        if (req.method == "PATCH" || req.method == "GET") {
            if(!product) {
                res.status(404).json({message: "Unable to find Product"});
                return;
            }
            else {
                res.product = product;
                next();
            }
        //post = create new object
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
/*
verifyProductParameters: verifys inputs for either product creation or product updates
request method  = PATCH then update
request methid = POSt then create
*/
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
