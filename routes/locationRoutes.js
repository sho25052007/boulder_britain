const express = require('express');
const router = express.Router();

const Location = require('../models/location');
const AppError = require('../utils/AppError');
const { locationSchema } = require('../joiSchema.js');
const flash = require('connect-flash');
const wrapAsync = require('../utils/wrapper');
const {isLoggedIn} = require('../middleware');

const grouping = (objArr, prop) => {
    return objArr.reduce((acc, obj) => {
        let key = obj[prop]
        if(!acc[key]) {
            acc[key] = []
        }
        acc[key].push(obj)
        return acc
    }, {})
}

const validateLocation = (req, res, next) => {
    const { error } = locationSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el=>el.message).join(',');
        throw new AppError(msg, 400);
    } else {
        next();
    }
}

//SHOW LOCATION
router.get('/', wrapAsync(async(req, res, next) => {
    const location = await Location.find({})
    const locationByArea = grouping(location, 'area')
    res.render('locations/index', { location, locationByArea, titleInHead: 'List of Boulder Locations' })
}));

//GET CREATE LOCATION
router.get('/new', isLoggedIn, (req, res) => {
    res.render('locations/new', {titleInHead : 'Create New Location' });
});

//CREATE LOCATION
router.post('/', isLoggedIn, validateLocation, wrapAsync(async(req, res, next) => {
    delete req.body['boulders'];
    const newPlaceName = new Location(req.body);
    await newPlaceName.save();
    req.flash('success', 'Successfully made new location!');
    res.redirect(`/boulders/${newPlaceName.place}`)
}));

//GET LOCATION EDIT
router.get('/:placeName/edit', isLoggedIn, wrapAsync(async(req, res, next) => {
    const { placeName } = req.params;
    const placeData = await Location.find({place: `${placeName}`})
    if (!placeData.length) {
        req.flash('error', 'Cannot edit that location!');
        return res.redirect('/locations');
    }
    res.render('locations/edit', { placeData, placeName, titleInHead: 'Edit ' + placeName });
}));

//PUT LOCATION EDIT
router.put('/:placeName', isLoggedIn, validateLocation, wrapAsync(async(req, res, next) => {
    const { placeName } = req.params;
    const newPlace = req.body.place;
    delete req.body['boulders'];
    const placeData = await Location.findOneAndUpdate( {place: placeName}, { $set: req.body }, { runValidator: true, new: true });
    req.flash('success', 'Successfully upgraded location!');
    res.redirect(`/boulders/${newPlace}`);
}));

//DELETE LOCATION
router.delete('/:placeName', isLoggedIn, wrapAsync(async(req, res, next) => {
    const { placeName } = req.params;
    const placeData = await Location.findOneAndDelete({place: `${placeName}`});
    req.flash('success', 'Successfully deleted location!');
    res.redirect('/locations/');
}));

module.exports = router;