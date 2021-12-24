const mongoose = require('mongoose');
const Boulder = require('./boulder');
const Schema = mongoose.Schema
const opts = { toJSON : { virtuals : true } }

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
}, opts)

locationSchema.virtual('properties.popupMarkup').get(function() {
    return `<a style="text-decoration:none; color: #000;" href="/boulders/${this.place}"><h6>${this.place}</h6><h7>${this.area}</h7></a>`
});

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
