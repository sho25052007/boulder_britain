const Boulder = require('./models/boulder');
const { boulderSchema, reviewSchema, locationSchema } = require('./joiSchema');
const AppError = require('./utils/AppError');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor = async(req, res, next) => {
    const { boulderName, placeName } = req.params;
    const newBoulder = await Boulder.find({name: boulderName});
    if (!newBoulder[0].author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/boulders/${placeName}`)
    }
    next();
}

module.exports.isReviewAuthor = async(req, res, next) => {
    const { placeName, reviewId } = req.params;
    const newReview = await Review.findById(reviewId);
    if (!newReview.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/boulders/${placeName}`)
    }
    next();
}

module.exports.validateBoulder = (req, res, next) => {
    const { error } = boulderSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el=>el.message).join(',');
        throw new AppError(msg, 400);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        // console.log(error);
        const msg = error.details.map(el=>el.message).join(',');
        throw new AppError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateLocation = async(req, res, next) => {
    const { error } = locationSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el=>el.message).join(',');
        throw new AppError(msg, 400);
    } else {
        next();
    }
}