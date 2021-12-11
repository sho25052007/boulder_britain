const mongoose = require('mongoose');
const { cloudinary } = require('../cloudinary');
const Review = require('./review');
const Schema = mongoose.Schema


const imageSchema = new Schema({
    url: String,
    filename: String
});

imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200')
});

const boulderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    images: [imageSchema],
    description: {
        type: String,
        required: true
    },
    author: {type: Schema.Types.ObjectId, ref:'User'},
    reviews: [{type: Schema.Types.ObjectId, ref:'Review'}]
});

boulderSchema.post('findOneAndDelete', async function(doc) {
    if (doc.reviews) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
    if (doc.images) {
        for (let image of doc.images) {
            await cloudinary.uploader.destroy(image.filename);
        }
    }
})

const Boulder = mongoose.model('Boulder', boulderSchema);
module.exports = Boulder;
