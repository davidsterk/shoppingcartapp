/* 
Searches a Product in mongodb. No role requirement
Retrive product or list of products by id, name, price, and a search term
*/
const ProductDB = require('../models/product.js');
const Product = ProductDB.getModel();

module.exports = async (req , res) => {

    //req query parameters
    let name = req.query.name;
    let lessThan = req.query.less;
    let greaterThan = req.query.greater;
    let searchTerm = req.query.search;

    //req query 
    let id = req.params.product_id;
    let product;
    if(name) {
        product = await Product.find({name: name});
    } 
    else if (lessThan && !greaterThan) {
        product = await Product.find({price: { $lte: lessThan}})
    }
    else if (!lessThan && greaterThan) {

        product = await Product.find({price: { $gte: greaterThan}});
    }
    else if (lessThan && greaterThan) {
        product = await Product.find({
            price: { $gte: greaterThan,  $lte: lessThan}
           });
    }
    else if (searchTerm) {
        product =  await Product.find({ $or: [ { name: { $regex: '.*' + searchTerm + '.*' } }, 
        { description: { $regex: '.*' + searchTerm + '.*' } } ]})
    } 
    else if (id) {
        product = await Product.find({_id: id});
    }
    else {
        product = await Product.find({});
    }

    let result = product.map( data => {
        return {
            id: data._id,
            name: data.name,
            description: data.description,
            quantity: data.quantity,
            price: data.price
        }
    });
    
    res.status(200).format( {
        "application/json": () => {
            res.json(result);
        },
        "application/xml": () => {
			let xmlOutput = `<?xml version="1.0"?>\n`+
			"<products>\n"+
			result.map(({id, name, description, quantity, price}) => {
                return `<product id="${id}">\n`+
                `<name>${name}</name>\n<description>${description}</description>\n`+
                `<quantity>${quantity}</quantity>\n<price>${price}</price>\n`+
                '</product>'
			}).join("\n") + `\n</products>\n`;
            res.type("application/xml");
			res.send(xmlOutput);
		}
    });

}