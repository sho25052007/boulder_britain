const Location = require('../models/location');
const { grouping } = require('../utils/groupingFunc');

module.exports.indexLocation = async(req, res, next) => {
    const location = await Location.find({})
    const locationByArea = grouping(location, 'area')
    res.render('locations/index', { location, locationByArea, titleInHead: 'List of Boulder Locations' })
}

module.exports.newLocation = (req, res) => {
    res.render('locations/new', {titleInHead : 'Create New Location' });
}

module.exports.postNewLocation = async(req, res, next) => {
    delete req.body['boulders'];
    const newPlaceName = new Location(req.body);
    await newPlaceName.save();
    req.flash('success', 'Successfully made new location!');
    res.redirect(`/boulders/${newPlaceName.place}`)
}

module.exports.editLocation = async(req, res, next) => {
    const { placeName } = req.params;
    const placeData = await Location.find({place: `${placeName}`})
    if (!placeData.length) {
        req.flash('error', 'Cannot edit that location!');
        return res.redirect('/locations');
    }
    res.render('locations/edit', { placeData, placeName, titleInHead: `Edit ${placeName}` });
}

module.exports.putEditLocation = async(req, res, next) => {
    const { placeName } = req.params;
    const newPlace = req.body.place;
    delete req.body['boulders'];
    const placeData = await Location.findOneAndUpdate( {place: placeName}, { $set: req.body }, { runValidator: true, new: true });
    req.flash('success', 'Successfully upgraded location!');
    res.redirect(`/boulders/${newPlace}`);
}

module.exports.deleteLocation = async(req, res, next) => {
    const { placeName } = req.params;
    const placeData = await Location.findOneAndDelete({place: `${placeName}`});
    req.flash('success', 'Successfully deleted location!');
    res.redirect('/locations/');
}