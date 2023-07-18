const express = require('express');
const router = express.Router();

//Controller
var signIn = require("../controller/signin");
var orderSubmit = require("../controller/ordersubmit")
var cart = require("../controller/cart");
var cartUpdate = require("../controller/cartupdate");
var getProducts = require("../controller/productlist");
var userAddItem = require('../controller/addtocart');
var deleteProduct = require("../controller/deleteproduct");
var updateProduct = require("../controller/updateproduct");
var createProduct = require("../controller/createproduct");
var signUp = require("../controller/signup");
var getUsers = require("../controller/userlist");

//Middleware
var registrationVerification = require("../middleware/registrationverification");
var auth = require("../middleware/authorization");
var productVerification = require("../middleware/productverification");

//Routes
router.post('/api/user/signup',registrationVerification.checkUserExists,signUp);

router.post('/api/user/signin', signIn);

router.post('/api/cart/additem', [auth.verifyToken, productVerification.checkProductExistsByID], userAddItem);

router.get('/api/cart/cart', auth.verifyToken, cart);

router.post('/api/cart/update', [auth.verifyToken,productVerification.checkProductExistsByID], cartUpdate);

router.post('/api/cart/submit', auth.verifyToken, orderSubmit);

router.get('/api/products', getProducts);

router.get('/api/products/:product_id', getProducts);

router.delete('/api/admin/products/:product_id', [auth.verifyToken, auth.isAdmin, productVerification.checkProductExistsByID], deleteProduct);

router.patch('/api/admin/products/:product_id', [auth.verifyToken, auth.isAdmin, productVerification.checkProductExistsByID, productVerification.verifyProductParameters],updateProduct);

router.post('/api/admin/products', [auth.verifyToken, auth.isAdmin, productVerification.verifyProductParameters,productVerification.checkProductExistsByName], createProduct);

router.get('/api/admin/user/', [auth.verifyToken, auth.isAdmin], getUsers);

router.get('/api/admin/user/:user_id', [auth.verifyToken, auth.isAdmin], getUsers)

module.exports = router;