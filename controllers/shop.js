const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list',
                {
                    prods: products,
                    pageTitle: 'All Products',
                    path: '/products'
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail',
                {
                    product: product,
                    pageTitle: product.title,
                    path: '/products'
                });
        })
        .catch(err => {
            console.log(err);
        });;
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/index',
                {
                    prods: products,
                    pageTitle: 'Shop',
                    path: '/'
                });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            res.render('shop/cart',
                {
                    pageTitle: 'Cart',
                    path: '/cart',
                    products: products
                });
        })
        .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         pageTitle: 'Checkout',
//         path: '/checkout'
//     });
// }

// exports.getOrders = (req, res, next) => {
//     res.render('shop/orders', {
//         pageTitle: 'Orders',
//         path: '/orders'
//     });
// }