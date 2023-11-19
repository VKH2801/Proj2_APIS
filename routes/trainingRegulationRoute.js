const express = require("express");
const router = express.Router();
const trainingReg = require("../controller/trainingRegulationController");

router.get('/', trainingReg.getAllTrainingReg);
router.get('/get/:id', trainingReg.getTrainingById);
router.post('/new', trainingReg.createNewTrainingReg);
router.put('/:id', trainingReg.updateTrainingReg);
router.delete('/deleteAll', trainingReg.deleteAllTrainingReg);
router.delete('/delete/:id', trainingReg.deleteTrainingRegById);

module.exports = router;