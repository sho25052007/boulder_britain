const Location = require('../models/location');
const { grouping } = require('../utils/groupingFunc');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

module.exports.indexLocation = async(req, res, next) => {
    const location = await Location.find({})
    const locationByArea = grouping(location, 'area')
    // console.log(location[0].properties.popupMarkup)
    res.render('locations/index', { location, locationByArea, titleInHead: 'List of Boulder Locations' })
}

module.exports.newLocation = (req, res) => {
    res.render('locations/new', {titleInHead : 'Create New Location' });
}

module.exports.postNewLocation = async(req, res, next) => {
    // console.log('postNewLocation', req.body);
    delete req.body['boulders'];
    const newPlaceName = new Location(req.body);
    newPlaceName.geometry = JSON.parse(req.body.geometry);
    newPlaceName.image.url = req.file.path;
    newPlaceName.image.filename = req.file.filename;
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
    // console.log('hi from putEditLocation', req.body);
    const { placeName } = req.params;
    const newPlace = req.body.place;
    delete req.body['boulders'];
    const editLocationObj = {
    area : req.body.area,
    place : req.body.place,
    geometry: JSON.parse(req.body.geometry),
    image : {
        url : req.file.path,
        filename : req.file.filename
    }};
    const placeData = await Location.findOneAndUpdate( {place: placeName}, { $set: editLocationObj}, { runValidator: true, new: true, overwrite: true });
    req.flash('success', 'Successfully upgraded location!');
    res.redirect(`/boulders/${newPlace}`);
}

module.exports.deleteLocation = async(req, res, next) => {
    const { placeName } = req.params;
    const placeData = await Location.findOneAndDelete({place: `${placeName}`});
    req.flash('success', 'Successfully deleted location!');
    res.redirect('/locations/');
}