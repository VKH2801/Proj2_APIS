const express = require("express");
const router = express.Router();
const trainingReg = require("../controller/trainingRegulationController");

router.get('/', trainingReg.getAllTrainingReg);
router.post('/new', trainingReg.createNewTrainingReg);
router.put(':id', trainingReg.updateTrainingReg);
router.delete('/deleteAll', trainingReg.deleteAllTrainingReg);
router.delete('/delete', trainingReg.deleteTrainingRegById);

module.exports = router;