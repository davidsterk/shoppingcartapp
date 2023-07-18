/*
Model for shopping cart. 
*/
const mongoose = require('mongoose');

const {dbUrl} = require("../config/project_env");

let connection = null;
let model = null;


let cart = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	totalPrice: Number,
	items: [{ 
		product: { type: mongoose.Schema.Types.ObjectId, ref: "products" }, 
		quantityOrdered: Number,
		productName: String,
		productPrice: Number,
		orderPrice: Number }]}, {
			toObject: {
			  virtuals: true,
			},
			toJSON: {
			  virtuals: true,
			},
		  },
    {collection: 'carts'});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("Cart", 
							cart);};
		return model;
	}
};
