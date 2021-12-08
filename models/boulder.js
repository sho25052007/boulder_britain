const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema

const boulderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {type: Schema.Types.ObjectId, ref:'User'},
    reviews: [{type: Schema.Types.ObjectId, ref:'Review'}]
});

boulderSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

const Boulder = mongoose.model('Boulder', boulderSchema);
module.exports = Boulder;
