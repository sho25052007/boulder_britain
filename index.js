const express = require('express');

const locationRoutes = require('./routes/locationRoutes');
const boulderRoutes = require('./routes/boulderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const AppError = require('./utils/AppError');

const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const body_parser = require('body-parser');


mongoose.connect('mongodb://localhost:27017/boulderBritain', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("DATABASE CONNECTED!")
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'thisshouldbeapropersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

// app.use(flash());
// app.use((req, res, next) => {
//     res.locals.success = req.flash('success');
//     next();
// })




app.use('/locations', locationRoutes);
app.use('/boulders', boulderRoutes);
app.use('/boulders/:placeName/:boulderName/review', reviewRoutes);
app.use('/grade', gradeRoutes);


app.all('*', (req, res, next) => {
    next(new AppError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Error Occurred!'
    res.status(statusCode).render('error', { err, titleInHead: 'Error Page' });
});

app.listen(3000, () => { console.log("LISTENING ON PORT 3000!") });
