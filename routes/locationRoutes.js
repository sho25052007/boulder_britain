const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapper');
const { isLoggedIn, validateLocation  } = require('../middleware');
const locationControllers = require('../controllers/locationControllers');


router.route('/')
    //SHOW LOCATION
    .get(wrapAsync(locationControllers.indexLocation))
    //CREATE LOCATION
    .post(isLoggedIn, validateLocation, wrapAsync(locationControllers.postNewLocation));

//GET CREATE LOCATION
router.get('/new', isLoggedIn, locationControllers.newLocation);

//GET LOCATION EDIT
router.get('/:placeName/edit', isLoggedIn, wrapAsync(locationControllers.editLocation));

router.route('/:placeName')
    //PUT LOCATION EDIT
    .put(isLoggedIn, validateLocation, wrapAsync(locationControllers.putEditLocation))
    //DELETE LOCATION
    .delete(isLoggedIn, wrapAsync(locationControllers.deleteLocation));


module.exports = router;