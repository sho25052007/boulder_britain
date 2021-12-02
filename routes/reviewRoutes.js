const express = require('express');
const router = express.Router({mergeParams: true});

const Boulder = require('../models/boulder');
const Review = require('../models/review');

const wrapAsync = require('../utils/wrapper');
const { reviewSchema } = require('../joiSchema.js');
const AppError = require('../utils/AppError');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        // console.log(error);
        const msg = error.details.map(el=>el.message).join(',');
        throw new AppError(msg, 400);
    } else {
        next();
    }
}

//POST REVIEW
router.post('/', validateReview, wrapAsync(async(req, res) => {
    const { placeName, boulderName } = req.params;
    const boulderData = await Boulder.find({name: `${boulderName}`});
    const review = new Review(req.body);
    await review.save();
    boulderData[0].reviews.push(review);
    await boulderData[0].save();
    req.flash('success', 'Successfully made new review!');
    res.redirect(`/boulders/${placeName}`);
}));

//DELETE REVIEW
router.delete('/:reviewId', async(req, res, next) => {
    const { placeName, boulderName, reviewId } = req.params;
    const foundBoulder = await Boulder.find({name: `${boulderName}`});
    await Boulder.findByIdAndDelete(foundBoulder._id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/boulders/${placeName}`);
})

module.exports = router