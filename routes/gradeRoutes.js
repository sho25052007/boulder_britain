const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapper');
const gradeControllers = require('../controllers/gradeControllers');

//SHOW GRADELIST
router.get('/:gradeNum', wrapAsync(gradeControllers.indexGradeList));

module.exports = router