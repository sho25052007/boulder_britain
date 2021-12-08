const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapper');
const { isLoggedIn, isAuthor, validateBoulder } = require('../middleware');
const boulderControllers = require('../controllers/boulderControllers');


router.route('/:placeName')
    //SHOW ROUTE BY PLACE
    .get(isLoggedIn, wrapAsync(boulderControllers.indexBoulderPlace))
    //CREATE ROUTE
    .post(isLoggedIn, validateBoulder, wrapAsync(boulderControllers.postNewBoulder));

//GET CREATE ROUTE
router.get('/:placeName/new', isLoggedIn, boulderControllers.newBoulder);

//GET ROUTE EDIT
router.get('/:placeName/:boulderName/edit', isLoggedIn, isAuthor, wrapAsync(boulderControllers.editBoulder));

router.route('/:placeName/:boulderName')
    //PUT ROUTE EDIT
    .put(isLoggedIn, isAuthor, validateBoulder, wrapAsync(boulderControllers.putEditBoulder))
    //DELETE ROUTE
    .delete(isLoggedIn, isAuthor, wrapAsync(boulderControllers.deleteBoulder));


module.exports = router