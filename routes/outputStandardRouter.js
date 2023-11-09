const express = require("express");
const router = express.Router();
const outputStandardController = require("../controller/outputStandardCollection");

router.get('/', outputStandardController.getAllOutputStandard);
router.get('/get/:id', outputStandardController.getOutputStandardById);
router.post('/new', outputStandardController.createOutputStandard);
router.put("/:id", outputStandardController.updateOutputStandard);
router.delete('/deleteAll', outputStandardController.deleteAllOutputStandard);
router.delete('/delete', outputStandardController.deleteById);
module.exports = router;