const mongoose = require('mongoose');
const Boulder = require('./boulder');
const Schema = mongoose.Schema

const locationSchema = new Schema({
    area: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    boulders: [{type: Schema.Types.ObjectId, ref:'Boulder'}]
})

locationSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await Boulder.deleteMany({
            _id: {
                $in: doc.boulders
            }
        })
    }
})


module.exports = mongoose.model('Location', locationSchema);
