// global packages
const path = require('path');

// local packages/files
const shopController = require('../controllers/shop');

// third party packages
const express = require('express');
const routes = express.Router();

routes.get('/', shopController.getIndex);

routes.get('/products', shopController.getProducts);

routes.get('/cart', shopController.getCart);

routes.get('/checkout', shopController.getCheckout);

routes.get('/orders', shopController.getOrders)

module.exports = routes;