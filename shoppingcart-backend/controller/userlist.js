/* 
Gets list of users. Only used by users with admin role
*/
const UserDB = require('../models/user.js');
const User = UserDB.getModel();

module.exports = async (req , res) => {
    let id = req.params.user_id
    let user;
    if(id) {
        try {
            user = await User.find({_id: id}).exec();  
        } catch (err) {
           res.sendStatus(500);
           console.log(err.stack);
            return;
        }
    } else {
        try {
            user = await User.find({}).exec();
        } catch (err) {
            res.sendStatus(500);
            console.log(err.stack);
             return;
         }
    }
    let result = user.map( data => {
        return {
            id: data._id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address
        }
    });

    res.status(200).format( {
        "application/json": () => {
            res.json(result);
        },
        "application/xml": () => {
			let xmlOutput = `<?xml version="1.0"?>\n`+
			"<Users>\n"+
			result.map(({id, email, firstname, lastName, address}) => {
                return `<User id="${id}">\n`+
                `<email>${email}</email>\n<firstname>${firstname}</firstName>\n`+
                `<lastname>${lastName}</lastname>\n<address>\n<steet>${address.steet}</street>\n
                <city>${city}</city>\n<state>${address.state}</state>\n<zip>${address.zip}</zip>\n</address>\n`+
                '</User>'
			}).join("\n") + `\n</Users>\n`;
            res.type("application/xml");
			res.send(xmlOutput);
		}
    });
}