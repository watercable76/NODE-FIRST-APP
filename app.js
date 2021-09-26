// any global packages that are needed go here
const path = require('path');

// third party packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// import files
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

// import Objects/classes
const User = require('./models/user');
const Login = require('./login');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// adding features to support Heroku development
const corsOptions = {
    origin: "https://node-first-app-cse341.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || `mongodb+srv://${Login.username}:${Login.pass}@cluster0.lwwzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use((req, res, next) => {
    User.findById('614fdfe1e754c102d7582f37')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
    .connect(
        MONGODB_URL, options
    )
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Nick',
                    email: 'nik@coolio.com',
                    cart: { items: [] }
                });
                user.save();
            }
        });
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log(err));