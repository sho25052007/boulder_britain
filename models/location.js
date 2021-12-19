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
    geometry: {
        type: {
            type: String,
            enum: ['Point']
          },
        coordinates: {
            type: [Number]
          }
    },
    image: {
        url: String,
        filename: String
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
