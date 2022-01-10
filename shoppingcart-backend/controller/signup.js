const UserDB = require("../models/user");
const AccountTypeDB = require("../models/accounttype");
const AccountType = AccountTypeDB.getModel();
const User = UserDB.getModel();
const bcrypt = require('bcryptjs');

/* 
Sign up for user
salts and hashes the password
assigns the customer account tyoe
returns the url location of the new user
*/
module.exports = async (req, res) => {
    try {
        let accountType = AccountType.findOne({accountTypeName: "customer"}).exec();
        let salt = await bcrypt.genSalt(10);
        let user = new User({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            accountType: accountType._id,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
            }
        });
        await user.save();
        res.setHeader('Location','/api/user/'+user._id);
        res.status(200).json({message: "success"});
    } catch (err) {
        res.status(500).json({message: "error"})
        console.log(err.stack);
        return;
    }
};