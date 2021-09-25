const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

module.exports = class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();

        return db.collection('users').insertOne(this);
        /*
        let dbOp;
 
        if (this._id) {
            dbOp = db.collection('users').updateOne({ username: username }, { $set: this });
        } else {
            dbOp = db.collection('users').insertOne(this);
        }
 
        return dbOp.then(result => {
            console.log(result);
        })
            .catch(err => {
                console.log(err);
            });
            */
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity });
        }

        const updatedCart = { items: updatedCartItems };

        const db = getDb();
        return db.collection('users')
            .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } })
            .then(products => {
                console.log(products);
            })
            .catch(err => {
                console.log(err);
            });
    }

    getCart() {
        const db = getDb();
        console.log(this.cart);
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });
        return db
            .collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity
                    };
                });
            })
            .catch(err => console.log(`getCart logging \n${err}`));
    }

    deleteItemFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });

        const db = getDb();
        return db.collection('users')
            .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCartItems } })
            .then(products => {
                console.log(products);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('users')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(user => {
                console.log(user);
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }
}