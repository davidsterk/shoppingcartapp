/*
Model for Users (customers and admins)
*/
const mongoose = require('mongoose');

const {dbUrl} = require("../config/project_env");

let connection = null;
let model = null;


let user = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String, 
    lastName: String, 
    accountType: { type: mongoose.Schema.Types.ObjectId, ref: "accounttypes" },
    address: {
        street: String,
        city: String,
        state: String,
        zip: Number
    }
}, {collection: 'users'});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("User", 
							user);};
		return model;
	}
};
