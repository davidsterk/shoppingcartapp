/*
Model for Account type roles
*/
const mongoose = require('mongoose');
const {dbUrl} = require("../config/project_env");

let connection = null;
let model = null;

let accountType = new mongoose.Schema({
    accountTypeName: String
}, {collection: 'acounttypes'});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("AccountType", 
							accountType);};
		return model;
	}
};
