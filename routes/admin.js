// global packages
const path = require('path');

// local packages/files
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

// third party packages
const express = require('express');
const router = express.Router();

// original route set in app.js and rest of path is set here in js file
router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;