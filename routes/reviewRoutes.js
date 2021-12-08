const express = require('express');
const router = express.Router({mergeParams: true});

const wrapAsync = require('../utils/wrapper');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviewControllers = require('../controllers/reviewControllers')

//POST REVIEW
router.post('/', validateReview, isLoggedIn, wrapAsync(reviewControllers.postReview));

//DELETE REVIEW
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, reviewControllers.deleteReview )

module.exports = router