const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list',
            {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index',
            {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
    });
}

exports.getCart = (req, res, next) => {
    // Product.fetchAll(products => {
        res.render('shop/cart',
            {
                // prods: products,
                pageTitle: 'Cart',
                path: '/cart'
            });
    // });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders'
    });
}