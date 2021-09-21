// global packages
const path = require('path');

// local packages/files
const productsController = require('../controllers/products');

// third party packages
const express = require('express');
const routes = express.Router();

routes.get('/', productsController.getProduct);

module.exports = routes;