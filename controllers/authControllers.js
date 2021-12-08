const User = require('../models/user');

module.exports.indexRegister = (req, res) => {
    res.render('users/register', { titleInHead : 'Register' });
}

module.exports.postRegister = async(req, res, next) => {
    try {
        const { email, username, password, confirmPassword } = req.body;
        const user = new User({email, username});
        const foundEmail = await User.find({email: `${email}`});
        console.log(foundEmail)
        if (foundEmail.length) {
            req.flash('error', 'That Email Address is already registered!')
            res.redirect('back')
        } else if (password !== confirmPassword) {
            req.flash('error', 'Password does not match!')
            res.redirect('back')
        } else {
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, err => {
                if(err) return next(err);
                req.flash('success', 'Welcome to Boulder Britain');
                res.redirect('/locations');
            })
        }
    } catch(e) {
        console.log(e.message);
        req.flash('error', e.message);
        res.redirect('register')
    }
}

module.exports.indexLogin = (req, res) => {
    res.render('users/login', { titleInHead : 'Login' });
}

module.exports.postLogin = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/locations';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.getLogout = (req, res) => {
    req.logout();
    req.flash('success', 'You have been logged out!')
    res.redirect('/locations');
}