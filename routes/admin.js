// global packages
const path = require('path');

// local packages/files
const rootDir = require('../util/path');

// third party packages
const express = require('express');
const router = express.Router();

const products = [];

// original route set in app.js and rest of path is set here in js file
router.get('/add-product', (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product'});
});

router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title, price: req.body.price, desc: req.body.description});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;