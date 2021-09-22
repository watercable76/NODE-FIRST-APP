// global packages
const path = require('path');

// local packages/files
const adminController = require('../controllers/admin');

// third party packages
const express = require('express');
const router = express.Router();

// original route set in app.js and rest of path is set here in js file
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);


module.exports = router;