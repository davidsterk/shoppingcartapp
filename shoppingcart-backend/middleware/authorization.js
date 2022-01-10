/*
Authorization middleware
--verify's jwt token
--verify admin or customer role
*/
const UserDB = require('../models/user');
const AccountTypeDB = require('../models/accounttype');
const User = UserDB.getModel();
const AccountType = AccountTypeDB.getModel();
const {secretKey} = require("../config/project_env");
const jwt = require('jsonwebtoken');

module.exports = {
/*
VerifyToken: receives the JWT token from the request and verify's the token. If verified, then continues to the business layer
Will not verify if token is expired
returns next or 401 if unauthorized
*/
    verifyToken: async (req, res, next) => {
        let token = req.headers.authorization;
        if(!token) {
            res.sendStatus(401);
            return;
        }
        token = token.split(' ')[1]; //split token from bearer prefix
        if(!token) {
            res.sendStatus(401);
            return;
        }
        try {
            let authorizedUser = jwt.verify(token,secretKey);
            if(!authorizedUser) {
                res.sendStatus(401);
                return;
            }
            req.userID = authorizedUser.user_id;
            next();
        } catch (err) {
            let message = "Unauthorized";
            if(err instanceof jwt.TokenExpiredError) {
                message = "Unauthorized - Token Expired";
            }
            res.status(401).json({message: message});
            console.log(err.stack);
            return;
        }

    },
/*
isCustomer: Used the verify whether users with the customer role can access the resource
returns next or status 401
*/
    isCustomer: async (req, res, next) => {
        try {
            let user = await User.findById(req.userID).exec();
            let accountType = await AccountType.findById(user.accountType).exec()
            if(accountType.accountTypeName == 'customer') {
                next();
            } else {
                res.sendStatus(401);
                return;
            }
        } catch(err) {
            res.sendStatus(400);
            console.log(err.stack);
            return;
        }
    },
/*
isAdmin: Used the verify whether users with the customer role can access the resource
returns next or status 401
*/
    isAdmin: async (req, res, next) => {
        try {
            let user = await User.findById(req.userID).exec();
            let accountType = await AccountType.findById(user.accountType).exec()
            if(accountType.accountTypeName == 'admin') {
                next();
            } else {
                res.sendStatus(401);
                return;
            }
        } catch(err) {
            res.sendStatus(400);
            console.log(err.stack);
            return;
        }
    }
};
