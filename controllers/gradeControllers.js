const Boulder = require('../models/boulder');
const Location = require('../models/location');

const { grouping } = require('../utils/groupingFunc');

module.exports.indexGradeList = async(req, res, next) => {
    const { gradeNum } = req.params;
    const gradeList = await Boulder.find({grade: gradeNum});
    const gradeObj = function Object(name, place, area, images, description) {
        this.name = name;
        this.place = place;
        this.area = area;
        this.images = images;
        this.description = description;
    };
    gradeDataSet = [];
    gradeMapData = [];
    for (let i=0; i < gradeList.length; i++) {
        const matchLocationToBoulder = await Location.find({boulders: gradeList[i]._id});
        // console.log(matchLocationToBoulder[0].properties.popupMarkup)
        const gradeData = new gradeObj(gradeList[i].name, matchLocationToBoulder[0].place, matchLocationToBoulder[0].area, gradeList[i].images, gradeList[i].description)
        gradeDataSet.push(gradeData)
        gradeMapData.push(matchLocationToBoulder[0]);
    }
    // console.log(gradeDataSet);
    const gradeListByArea = grouping(gradeDataSet, 'area');
    // console.log(gradeListByArea);
    res.render('grades/grade', { gradeMapData, gradeList, gradeNum, gradeListByArea, titleInHead : gradeNum })
}