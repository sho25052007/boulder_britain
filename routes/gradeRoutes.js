const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapper');
const { isLoggedIn  } = require('../middleware');
const gradeControllers = require('../controllers/gradeControllers');

//SHOW GRADELIST
router.get('/:gradeNum', isLoggedIn, wrapAsync(gradeControllers.indexGradeList));

module.exports = router