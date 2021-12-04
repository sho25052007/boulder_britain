const express = require('express');
const router = express.Router();

const Boulder = require('../models/boulder');
const Location = require('../models/location');

const wrapAsync = require('../utils/wrapper');
const { boulderSchema } = require('../joiSchema.js');
const AppError = require('../utils/AppError');

const {isLoggedIn} = require('../middleware');

const gradesNum = ["8C", "8B+", "8B", "8A+", "8A", "7C+", "7C", "7B+", "7B", "7A+", "7A", "6C+", "6C", "6B+", "6B", "6A+", "6A", "5+", "5", "4+", "4"];

const validateBoulder = (req, res, next) => {
    for (let i=0; i < req.body.length; i++){
        console.log(req.body[i])
        const { error } = boulderSchema.validate(req.body[i]);
        if (error) {
            const msg = error.details.map(el=>el.message).join(',');
            throw new AppError(msg, 400);
        }
    }
    next();
}


//SHOW ROUTE BY PLACE
router.get('/:placeName', isLoggedIn, wrapAsync(async(req, res, next) => {
    const { placeName } = req.params;
    const placeData = await Location.find({place: `${placeName}`}).populate('boulders');
    if (!placeData.length) {
        req.flash('error', 'Cannot find that bouldering location!');
        return res.redirect('/locations');
    }
    const boulderReviews = new Object();
    if (placeData[0].boulders){
        const allBoulders = placeData[0].boulders
        // console.log(allBoulders)
        for (let i=0; i < allBoulders.length; i++) {
            const boulderName = allBoulders[i].name
            const boulderData = await Boulder.find({name: `${boulderName}`}).populate('reviews');
            const reviewData = boulderData[0].reviews
            // console.log(reviewData)
            boulderReviews[`${boulderName}`] = reviewData;
        }
    }
    // console.log(boulderReviews)
    res.render('boulders/place', { placeData, placeName, titleInHead: placeName, boulderReviews });
}));

//GET CREATE ROUTE
router.get('/:placeName/new', isLoggedIn, (req, res) => {
    const { placeName } = req.params;
    res.render('boulders/new', { placeName, gradesNum, titleInHead: 'Create New Route'});
});

//CREATE ROUTE
router.post('/:placeName', isLoggedIn, validateBoulder, wrapAsync(async(req, res, next) => {
    const { placeName } = req.params;
    const newBoulder = new Boulder(req.body[0]);
    const placeData = await Location.find({place: `${placeName}`}).populate('boulders');
    await newBoulder.save();
    placeData[0].boulders.push(newBoulder);
    await placeData[0].save();
    req.flash('success', 'Successfully made new route!');
    res.redirect(`/boulders/${placeName}`);
}));

//GET ROUTE EDIT
router.get('/:placeName/edit', isLoggedIn, wrapAsync(async(req, res, next) => {
    const { placeName } = req.params;
    const placeData = await Location.find({place: `${placeName}`}).populate('boulders');
    if (!placeData.length) {
        req.flash('error', 'Cannot find that bouldering location to edit!');
        return res.redirect('/locations');
    }
    const bouldersList = placeData[0].boulders;
    console.log(bouldersList);
    res.render('boulders/edit', { placeName, bouldersList, gradesNum, titleInHead: 'Edit Routes' });
}));

//PUT ROUTE EDIT
router.put('/:placeName', isLoggedIn, validateBoulder, wrapAsync(async(req, res, next) => {
    const { placeName } = req.params;
    const placeData = await Location.find({place: `${placeName}`}).populate('boulders');
    const bouldersList = placeData[0].boulders;
    bouldersList.forEach(async(boulder, index) => {
        const nameData = req.body[index].name;
        const gradeData = req.body[index].grade;
        const boulderData = await Boulder.findByIdAndUpdate( boulder._id, {name: nameData, grade: gradeData}, {runValidator: true, new: true});
    })
    req.flash('success', 'Successfully updated route!');
    res.redirect(`/boulders/${placeName}`);
}));

//DELETE ROUTE
router.delete('/:placeName/:boulderName', isLoggedIn, wrapAsync(async(req, res, next) => {
    const { placeName, boulderName } = req.params;
    // console.log(req.params)
    const boulderData = await Boulder.findOneAndDelete({name: `${boulderName}`});
    req.flash('success', 'Successfully deleted route!');
    res.redirect(`/boulders/${placeName}`);
}));

module.exports = router