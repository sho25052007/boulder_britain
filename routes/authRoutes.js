const express = require('express');
const router = express.Router();

const passport = require('passport');
const wrapAsync = require('../utils/wrapper');
const authControllers = require('../controllers/authControllers');

router.route('/register')
    //SHOW REGISTER
    .get(authControllers.indexRegister)
    //POST REGISTER
    .post(wrapAsync(authControllers.postRegister));

router.route('/login')
    //SHOW LOGIN
    .get(authControllers.indexLogin)
    //POST LOGIN
    .post(
        passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),
        authControllers.postLogin
    );

//GET LOGOUT
router.get('/logout', authControllers.getLogout);

module.exports = router;