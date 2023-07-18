# Shopping cart application using Angular and Express

This project implements a shopping cart web application for widgets using the MEAN stack. Angular is used for the frontend, Express for backend, and MongoDB for the database. The Angular client queries the backend with REST API endpoints. The application is secured with json web tokens (jwt) that is stored in session storage in the user's web browser.

## Tech Stack

- Frontend: Angular
- Backend: Express
- Database: MongoDB

## Functionality

- A Guest can insert items into a shopping cart stored in localStorage
- A Guest can update items in their shopping cart in localStorage
- A Guest can either sign in or register
- Signing in will store the shopping cart from localstorage to the mongodb database. The shopping cart localstorage is deleted
- Logged in users can update their cart from mongodb
- If there are no inventory for an item, the customer cannot add the item
- To submit an order the customer first has to login
- Users are authenticated with jwt

## Build

1. In terminal or command line navigate to the shoppingcartapp root directory and run npm install for both shoppingcart-angular/ and shoppingcart-backend/

2. Setup the environment variables for the backend using the shoppingcart-backend/.env.template file and remove the .template suffix. Keep in mind that the angular frontend expects the server and port to be localhost and 3000 respectively.

3. Create the mongo user if necessary. You may use the shoppingcart-backend/database/mongo_createuser.js script to create the user.

4. Run database/initializeDB.js to populate the mongodb database.

5. Run shoppingcart_backend/server.js to start the express server.

6. run shoppingcart/ ng serve to start angular

7. In the browser navigate to http://localhost:4200/ which should be take you to a Product Search page.