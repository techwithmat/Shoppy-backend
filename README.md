# Ecommerce REST-API
This is the backend of the project [Ecommerce](https://github.com/Mateo2131/Ecommerce). It is a REST-API that allows you to manage your ecommerce.
### 🦾 Technologies 

* [Nodejs](https://www.npmjs.com/package/ecommerce-api) - Javascript runtime.
* [Express](https://www.npmjs.com/package/express) - Nodejs framework.
* [MongoDB](https://www.npmjs.com/package/mongodb) - Document-oriented database.

### ✨ Getting Started

1. Clone the repository and install the dependencies.
   ```sh
   git clone https://github.com/Mateo2131/Ecommerce-backend.git
   npm install
   ```
2. Created an .env file with the following variables:
   ```sh
    MONGODB_URL=
    PORT=
    JWT_SECRET=
    ```
  * **MONGO_URL**: is the connection string to your MongoDB database. You can get the connection string in [MongoDB Atlas](https://www.mongodb.com/en/atlas/database).
  * **PORT**: is the port number that the server will be listening to.
  * **JWT_SECRET**: is the secret key that will be used to sign the JWT tokens.
3. Run the server
   ```sh
   npm dev
   ```
### 📚 Documentation

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

### 📝 Features

* Users can login and logout.
* Update, delete and list users, products and orders.
* Users can add products to their cart and checkout.
* Users can see their cart and remove products from it.
* Users can see their orders.
### ⚙️ Roadmap

- [ ] Add authentication
- [ ] Add cart functionality
- [ ] Add checkout functionality


See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

### ⭐️ Show your support

Give a ⭐️ if you liked it!
