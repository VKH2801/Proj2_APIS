const express = require("express");
const router = express.Router();
const classifyScale = require("../controller/classificationScaleController");


router.get('/', classifyScale.getAllClassifications);
router.get('/get/:id', classifyScale.getClassifyById);
router.post('/new', classifyScale.createClassifyScale);
router.put('/:id', classifyScale.updateCls);
router.delete('/deleteAll', classifyScale.deleteAll);
router.delete('/delete/:id', classifyScale.deleteWithId);

module.exports = router;