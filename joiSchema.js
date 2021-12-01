const Joi = require('joi');

module.exports.boulderSchema = Joi.object({
    name: Joi.string().required(),
    grade: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    reviews: Joi.any()
})

module.exports.locationSchema = Joi.object({
    area: Joi.string().required(),
    place: Joi.string().required(),
    latitude: Joi.number().required().min(0),
    longitude: Joi.number().required(),
    image: Joi.string().required(),
    boulders: Joi.any()
});

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
})