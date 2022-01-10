//Script to initialize mongo database with starting values
const ProductDB = require('../models/product.js');
const CartDB = require('../models/cart.js');
const OrderDB = require('../models/order.js');
const AccountTypeDB = require('../models/accounttype.js');

const Product = ProductDB.getModel();
const Cart = CartDB.getModel();
const Order = OrderDB.getModel();
const AccountType = AccountTypeDB.getModel();


(async() => {
    //clear collections
    await User.collection.drop();
    await Product.collection.drop();
    await Cart.collection.drop();
    await Order.collection.drop();
    await AccountType.collection.drop();

//create Account Types

    let accountType1 = new AccountType({
        accountTypeName: 'customer'
    });

    let accountType2 = new AccountType({
        accountTypeName: 'admin'
        }); 
    
    
//create products
let product1 = new Product({
    name: "widget1",
    description: "elegantly crafted widget",
    quantity: 6,
    price: 10
});

let product2 = new Product({
    name: "widget2",
    description: "expertly crafted widget",
    quantity: 3,
    price: 20
});


let product3 = new Product({
    name: "widget3",
    description: "finely crafted widget",
    quantity: 5,
    price: 15
});

let product4 = new Product({
    name: "widget4",
    description: "reasonably well crafted widget",
    quantity: 10,
    price: 5
});


let product5 = new Product({
    name: "widget5",
    description: "finely crafted shiny widget",
    quantity: 3,
    price: 17
});

let product6 = new Product({
    name: "widget6",
    description: "finely crafted robust widget",
    quantity: 0,
    price: 24
});

	await Promise.all([
            accountType1.save(),
            accountType2.save(),
            product1.save(),
            product2.save(),
            product3.save(),
            product4.save(),
            product5.save(),
            product6.save(), 
		]);


	process.exit();

})();












