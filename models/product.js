const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

module.exports = class Product {
    constructor(title, imageUrl, desc, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = desc;
        this.price = price;
    }

    save() {
        const db = getDb();
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    // getProductsFromFile(products => {
    //     if (this.id) {
    //         const existingProductIndex = products.findIndex(prod => prod.id === this.id);
    //         const updatedProducts = [...products];
    //         updatedProducts[existingProductIndex] = this;
    //         fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
    //             console.log(err);
    //         });
    //     } else {
    //         this.id = Math.random().toString();
    //         products.push(this);
    //         fs.writeFile(p, JSON.stringify(products), (err) => {
    //             console.log(err);
    //         });
    //     }
    // });


    // static deleteById(id) {
    //     getProductsFromFile(products => {
    //         const product = products.find(prod => prod.id === id);
    //         const updatedProducts = products.filter(p => p.id !== id);
    //         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //             if (!err) {
    //                 Cart.deleteProduct(id, product.price);
    //             }
    //         });
    //     });
    // }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

}