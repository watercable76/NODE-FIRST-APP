// global packages
const path = require('path');

// local packages/files
const productsController = require('../controllers/products');

// third party packages
const express = require('express');
const router = express.Router();

// original route set in app.js and rest of path is set here in js file
router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

module.exports = router;