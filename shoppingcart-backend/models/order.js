/*
Model for orders. Stores the information from shoppingcart model after successful check out
*/
const mongoose = require('mongoose');

const {dbUrl} = require("../config/project_env");

let connection = null;
let model = null;


let order = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	totalPrice: Number,
	orderDate: Date,
    orderStatus: String,
	items: [{ 
		productID: String, 
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
    {collection: 'orders'});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("Orders", 
							order);};
		return model;
	}
};
