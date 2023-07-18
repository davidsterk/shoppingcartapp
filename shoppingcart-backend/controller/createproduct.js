/* 
Creates a Product in mongodb. Only allowed by users with admin role
Returns the created product along with the url location
*/
const ProductDB = require('../models/product.js');
const Product = ProductDB.getModel();

module.exports = async (req , res) => {
    
    let product = new Product({
        name: req.body.name.toString().toLowerCase(),
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price
      });
    
    try {
        await product.save();
    } catch(err) {
        sendStatus(500);
        console.log(err.stack);
        return;
    }

    let newProduct = {
        id: product._id,
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price
    };
    res.status(200);
    res.setHeader('Location','/api/products/'+newProduct.id);
    res.format( {
    "application/json": () => {
        res.json(newProduct);
    },
    "application/xml": () => {
	    let xmlOutput = `<?xml version="1.0"?>\n`+
		"<products>\n"+
		newProduct.map(({id, name, description, quantity, price}) => {
            return `<product id="${id}">\n`+
            `<name>${name}</name>\n<description>${description}</description>\n`+
                `<quantity>${quantity}</quantity>\n<price>${price}</price>\n`+
                '</product>'
			}).join("\n") + `\n</products>\n`;
            res.type("application/xml");
			res.send(xmlOutput);
		}
    });
    
};