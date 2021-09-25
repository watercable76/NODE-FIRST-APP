// global packages
const path = require('path');

// local packages/files
const adminController = require('../controllers/admin');

// third party packages
const express = require('express');
const router = express.Router();

// original route set in app.js and rest of path is set here in js file
router.get('/add-product', adminController.getAddProduct);

// router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);


module.exports = router;