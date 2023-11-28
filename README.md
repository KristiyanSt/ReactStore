# ReactStore

This project is a web application for shopping purposes built with ReactJS

# Getting started

1.Clone the repository
2.Go to client directory and install depencencies

```bash
    cd client
    npm install
```

3.Start the server

```bash
    cd server
    node server.js
```
3.Start the client

```bash
    cd client
    npm start
```
# Features 
* Products page with listed products with paginating
* Details page for specific product with a interface for adding to shopping cart and rating the product
* Login for signing in 
* Register for creating an account
* Create/Edit/Delete pages for product maintaining and processing

# Roles

There are three roles within the system:

1.Admin

 - Admin has access to full CRUD operations read, update, delete, create new products /furniture/.

2.User

 - Logged in user can read data, post rating about specific product, add products to their cart, change quantity of chosen product/remove products from cart.

3.Guest
* Guest has access to reading data about products.

* Testing is possible with credentials listed below: 

**Admin**: 
```bash
peter@abv.bg : 123456
```
**User**: 
```bash
john@abv.bg : 123456
```

# Client data persistence
-Shopping cart 
* Data about id and quantity of each product is stored in an array in local storage 

-User data
* Personal user information is stored in an object in local storage 


# Libraries/Decisions
This project uses Bootstrap for styling and css.
Context API is used for better communication between components and data accessibility.


# Hosting
Frontend is deployed on firebase - (https://reactstore-b01bd.web.app/)

