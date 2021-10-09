const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};




// code for team activity
// Controller for W08
const https = require('https');

const ITEMS_PER_PAGE = 10; // Limit of 10 items per page.

exports.postProcessJson = (req, res, next) => {
    // read json
    var url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';

    https
        .get(url, function (response) {
            var body = '';

            response.on('data', function (chunk) {
                body += chunk;
            });

            response.on('end', function () {
                global.jsonResponse = JSON.parse(body);

                let searchedValue = req.body.searchValue || req.query.searchValue || ''; // Handle for GET, POST or neither
                let page = req.query.page || 1; // Grab our page number, 1 if undefined

                const indexStart = (page - 1) * ITEMS_PER_PAGE; // Item index to start on...
                const indexEnd = page * ITEMS_PER_PAGE;

                const filteredData = global.jsonResponse.filter((x) =>
                    x.name.toLowerCase().includes(searchedValue.toLowerCase())
                );

                res.render('shop/proj08',
                    {
                        data: filteredData.slice(indexStart, indexEnd), // For JSON/Array and not Mongoose, .slice() works best.
                        path: '/proj08',
                        title: 'Lesson 8 Prove Assignment',
                        searchedValue: searchedValue,
                        page: page,
                        numPages: Math.ceil(filteredData.length / ITEMS_PER_PAGE),
                    });
            });
        })
        .on('error', function (e) {
            console.log('Got an error: ', e);
        });
};

// New code for W08...
exports.getProcessJSON = (req, res, next) => {
    let searchedValue = req.body.searchValue || req.query.searchValue || ''; // Handle for GET, POST or neither
    let page = req.query.page || 1; // Grab our page number, 1 if undefined

    const indexStart = (page - 1) * ITEMS_PER_PAGE; // Item index to start on...
    const indexEnd = page * ITEMS_PER_PAGE;

    const filteredData = global.jsonResponse.filter((x) =>
        x.name.toLowerCase().includes(searchedValue.toLowerCase())
    );

    res.render('shop/proj08',
        {
            data: filteredData.slice(indexStart, indexEnd), // For JSON/Array and not Mongoose, .slice() works best.
            path: '/proj08',
            title: 'Lesson 8 Prove Assignment',
            searchedValue: searchedValue,
            page: page,
            numPages: Math.ceil(filteredData.length / ITEMS_PER_PAGE),
        });
};
