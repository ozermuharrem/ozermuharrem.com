const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override') 
const path = require('path');
const fileUpload = require('express-fileupload');


//! NVC EXPORTS

const pageRoute = require('./routes/pageRoute');
const userRoute = require('./routes/userRoute'); 
const kategoriRoute = require('./routes/kategoriRoute');
const dashRoute = require('./routes/dashRoute');
const blogRoute = require('./routes/blogRoute');


const app = express();

//! CONNECT DB
mongoose.connect('mongodb+srv://mozer:xfR07jwFVLEwzDrr@cluster0.xs4snwy.mongodb.net/mozer-db?retryWrites=true&w=majority')
// mongoose.connect('mongodb://localhost:27017/mozer-db')
.then(() => {
    console.log('DB Baglantili basarili');
})

//! TEMPLETE ENGINE

app.set('view engine','ejs');


//! GLOBAL DEGISKEN

global.userIN = null;

//! MIDDLEWARES
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(fileUpload());
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/mozer-db'})
}))
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMesaj = req.flash();
    next();
})
app.use(methodOverride('_method', {
    methods : ['POST','GET'],
}));



//!  ROUTES
app.use('*', (req,res,next) =>{
    userIN = req.session.userID;
    next();
})
app.use('/',pageRoute);
app.use('/users',userRoute);
app.use('/kategori', kategoriRoute);
app.use('/dash',dashRoute);
app.use('/blog',blogRoute);




const port = 3000;
app.listen(port, () => {
    console.log(`ozermuharrem.com port http://127.0.0.1:${port}/`);
});
