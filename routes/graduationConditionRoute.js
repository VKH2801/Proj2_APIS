const express = require("express");
const router = express.Router();
const graduationCondition = require("../controller/graduationConditionController");

router.get('/', graduationCondition.getAllGraduationConditions);
router.post('/new', graduationCondition.createGraduationCondition);
router.put('/:id', graduationCondition.updateGraduationCondition);
router.delete('/deleteAll', graduationCondition.deleteAllGraduationCondition);
router.delete('/delete', graduationCondition.deleteGraduationById);

module.exports = router;