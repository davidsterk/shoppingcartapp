/* 
user sign in. If authenicated generate a jwt token and send to client
along with user id, firstname and lastname
*/
const UserDB = require('../models/user.js');
const User = UserDB.getModel();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secretKey} = require("../config/project_env");

module.exports = async(req, res) => {
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    try {
        let user = await User.findOne({email: userEmail}).exec();
        let validPassword = await bcrypt.compare(userPassword, user.password);
        if(!validPassword) {
            response = {message: "Wrong Credentials"};
            res.status(403).json({response});
            return;
            }
        
        let token = jwt.sign({user_id: user._id}, secretKey, {expiresIn: 7200})
        res.status(200).json({
            user_id: user._id,
            firstname: user.firstName,
            lastname: user.lastName,
            accessToken: token
        })
    } catch (err) {
        res.sendStatus(500);
        console.log(err.stack);
        return;
    }
}