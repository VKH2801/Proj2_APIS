const express = require("express");
const router = express.Router();
const subjectCombinationController = require('../controller/subjectCombinationController');

router.get('/', subjectCombinationController.getAllSubCombination);
router.get('/get/:id', subjectCombinationController.getByIdSubjCombination)
router.post('/new', subjectCombinationController.createSubjCombination);
router.put('/:id', subjectCombinationController.updateSubjCombination);
router.delete('/deleteAll', subjectCombinationController.deleteAllSubjComb);
router.delete('/delete/:id', subjectCombinationController.deleteById);

module.exports = router;