const express = require("express");
const router = express.Router();
const graduationCondition = require("../controller/graduationConditionController");

router.get("/", graduationCondition.getAllGraduationConditions);
router.get("/get/:id", graduationCondition.getGraduationConditionsById);
router.post("/new", graduationCondition.createGraduationCondition);
router.put("/:id", graduationCondition.updateGraduationCondition);
router.delete("/deleteAll", graduationCondition.deleteAllGraduationCondition);
router.delete("/delete/:id", graduationCondition.deleteGraduationById);

module.exports = router;
