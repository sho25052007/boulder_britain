const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.boulderSchema = Joi.object({
    name: Joi.string().required().escapeHTML(),
    grade: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
    reviews: Joi.any(),
    deleteImages: Joi.array()
})

module.exports.locationSchema = Joi.object({
    area: Joi.string().required().escapeHTML(),
    place: Joi.string().required().escapeHTML(),
    geometry: Joi.any(),
    boulders: Joi.any()
});

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required().escapeHTML()
})