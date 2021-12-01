const express = require('express');
const router = express.Router();

const Boulder = require('../models/boulder');
const Location = require('../models/location');

const wrapAsync = require('../utils/wrapper');

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

//SHOW GRADELIST
router.get('/:gradeNum', wrapAsync(async(req, res, next) => {
    const { gradeNum } = req.params;
    const gradeList = await Boulder.find({grade: gradeNum});
    const gradeObj = function Object(name, place, area, image, description) {
        this.name = name;
        this.place = place;
        this.area = area;
        this.image = image;
        this.description = description;
    };
    gradeDataSet = [];
    for (let i=0; i < gradeList.length; i++) {
        const matchLocationToBoulder = await Location.find({boulders: gradeList[i]._id});
        // console.log(matchLocationToBoulder)
        const gradeData = new gradeObj(gradeList[i].name, matchLocationToBoulder[0].place, matchLocationToBoulder[0].area, gradeList[i].image, gradeList[i].description)
        gradeDataSet.push(gradeData)
    }
    // console.log(gradeDataSet);
    const gradeListByArea = grouping(gradeDataSet, 'area');
    // console.log(gradeListByArea);
    res.render('grades/grade', { gradeList, gradeNum, gradeListByArea, titleInHead : gradeNum })
}));

module.exports = router