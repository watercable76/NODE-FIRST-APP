// global packages
const path = require('path');

// local packages/files
const rootDir = require('../util/path');
const adminData = require('./admin');

// third party packages
const express = require('express');
const routes = express.Router();

routes.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'});
});

module.exports = routes;