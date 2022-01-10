const UserDB = require('../models/user');
const User = UserDB.getModel();

module.exports = {
/*
checkUserExists: for Registration, the email already exists, return status 400 otherwise continue to business layer
*/
    checkUserExists: async (req, res, next) => {
        let email = req.body.email;
        let user;
        try {
            user = await User.findOne({email: email}).exec();
        } catch (err) {
            res.sendStatus(500);
            console.log(err.stack);
            return;
        }
        if(user) {
            res.status(400).json({message: "Username already taken"});
            return;
        }
        next();
    },

    verifyUserRegister: async (req, res, next) => {
        //TODO
    }
}