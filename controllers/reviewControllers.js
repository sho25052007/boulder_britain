const Boulder = require('../models/boulder');
const Review = require('../models/review');

module.exports.postReview = async(req, res) => {
    const { placeName, boulderName } = req.params;
    const boulderData = await Boulder.find({name: `${boulderName}`});
    const review = new Review(req.body);
    review.author = req.user._id;
    await review.save();
    boulderData[0].reviews.push(review);
    await boulderData[0].save();
    req.flash('success', 'Successfully made new review!');
    res.redirect(`/boulders/${placeName}`);
}

module.exports.deleteReview = async(req, res, next) => {
    const { placeName, boulderName, reviewId } = req.params;
    const foundBoulder = await Boulder.find({name: `${boulderName}`});
    await Boulder.findByIdAndDelete(foundBoulder[0]._id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/boulders/${placeName}`);
}