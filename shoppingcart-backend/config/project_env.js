//Module that reads the .env file
require("dotenv").config()
module.exports = {
    host:     process.env.DB_HOST,
    port: 		process.env.DB_PORT,
    secretKey: process.env.EXPRESS_SECRETKEY,
    userName:   process.env.DB_USERNAME,
    password:   process.env.DB_PASSWORD,
    database:   process.env.DB_DATABASE,
    expressPort: process.env.EXPRESS_PORT,
    dbUrl: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    frontendServer: `http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`
}
