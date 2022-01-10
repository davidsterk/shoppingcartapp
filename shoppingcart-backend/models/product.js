/*
Model for products.
*/
const mongoose = require('mongoose');

const {dbUrl} = require("../config/project_env");

let connection = null;
let model = null;


let product = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number,
    price: Number
}, {collection: 'products'});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("Product", 
							product);};
		return model;
	}
};
