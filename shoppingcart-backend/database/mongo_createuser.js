//create the mongo user
db.createUser({
    user: "shoppingcart_user", 
    pwd: "shoppingcart_secret", 
    roles: [
        {
            role:"readWrite",
            db:"shoppingcart"
        }
    ]
});