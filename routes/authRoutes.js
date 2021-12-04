const express = require('express');
const router = express.Router();

const User = require('../models/user');
const wrapAsync = require('../utils/wrapper');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('users/register', { titleInHead : 'Register' });
});

router.post('/register', wrapAsync(async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to Boulder Britain');
            res.redirect('/locations');
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login', { titleInHead : 'Login' });
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/locations';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You have been logged out!')
    res.redirect('/locations');
})

module.exports = router;