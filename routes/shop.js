// global packages
const path = require('path');

// local packages/files
const shopController = require('../controllers/shop');

// third party packages
const express = require('express');
const routes = express.Router();

routes.get('/', shopController.getIndex);

routes.get('/products', shopController.getProducts);

routes.get('/products/:productId', shopController.getProduct);

routes.get('/cart', shopController.getCart);

routes.post('/cart', shopController.postCart);

routes.post('/cart-delete-item', shopController.postCartDeleteProduct);

routes.get('/orders', shopController.getOrders);

routes.get('/checkout', shopController.getCheckout);


module.exports = routes;