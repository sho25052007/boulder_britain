const Boulder = require('../models/boulder');
const Location = require('../models/location');
const { cloudinary } = require('../cloudinary');

const gradesNum = ["8C", "8B+", "8B", "8A+", "8A", "7C+", "7C", "7B+", "7B", "7A+", "7A", "6C+", "6C", "6B+", "6B", "6A+", "6A", "5+", "5", "4+", "4"];

module.exports.indexBoulderPlace = async(req, res, next) => {
    const { placeName } = req.params;
    const placeData = await Location.find({place: `${placeName}`}).populate('boulders').populate({
        path: 'boulders',
        populate: {
            path: 'author'
        }
    });
    if (!placeData.length) {
        req.flash('error', 'Cannot find that bouldering location!');
        return res.redirect('/locations');
    }
    const boulderObj = new Object();
    if (placeData[0].boulders){
        const allBoulders = placeData[0].boulders
        // console.log(allBoulders)
        for (let i=0; i < allBoulders.length; i++) {
            const boulderName = allBoulders[i].name
            const boulderData = await Boulder.find({name: `${boulderName}`}).populate({
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            });
            const reviewData = boulderData[0].reviews
            boulderObj[`${boulderName}review`] = reviewData;
            // console.log(boulderData)
        }
    }
    // console.log(boulderReviews)
    res.render('boulders/place', { placeData, placeName, titleInHead: placeName, boulderObj });
}

module.exports.newBoulder = (req, res) => {
    const { placeName } = req.params;
    res.render('boulders/new', { placeName, gradesNum, titleInHead: 'Create New Route'});
}

module.exports.postNewBoulder = async(req, res, next) => {
    const { placeName } = req.params;
    console.log(req.body)
    const newBoulder = new Boulder(req.body);
    newBoulder.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    newBoulder.author = req.user._id;
    const placeData = await Location.find({place: `${placeName}`}).populate('boulders')
    console.log(newBoulder);
    await newBoulder.save();
    placeData[0].boulders.push(newBoulder);
    await placeData[0].save();
    req.flash('success', 'Successfully made new route!');
    res.redirect(`/boulders/${placeName}`);
}

module.exports.editBoulder = async(req, res, next) => {
    const { placeName, boulderName } = req.params;
    const boulderData = await Boulder.find({name: `${boulderName}`}).populate('author');
    if (!boulderData.length) {
        req.flash('error', 'Cannot find that bouldering location to edit!');
        return res.redirect('/locations');
    }
    console.log(boulderData)
    res.render('boulders/edit', { boulderData, placeName, gradesNum, titleInHead: `Edit ${boulderName}` });
}

module.exports.putEditBoulder = async(req, res, next) => {
    const { placeName, boulderName } = req.params;
    console.log(req.body, 'putEditBoulder')
    const newBoulderData = await Boulder.findOneAndUpdate( {name: boulderName}, { $set: req.body }, {runValidator: true, new: true});
    const images = req.files.map(f => ({url: f.path, filename: f.filename}))
    newBoulderData.images.push(...images);
    await newBoulderData.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await newBoulderData.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated route!');
    res.redirect(`/boulders/${placeName}`);
}

module.exports.deleteBoulder = async(req, res, next) => {
    const { placeName, boulderName } = req.params;
    // console.log(req.params)
    const boulderData = await Boulder.findOneAndDelete({name: `${boulderName}`});
    req.flash('success', 'Successfully deleted route!');
    res.redirect(`/boulders/${placeName}`);
}