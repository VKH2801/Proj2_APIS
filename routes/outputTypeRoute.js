const express = require("express");
const router = express.Router();
const outputTypeController = require("../controller/outputTypeController");


router.get('/', outputTypeController.getAllOutputTypes);
router.post('/new', outputTypeController.createNewOutputType);
router.put('/:id', outputTypeController.updateOutputType);
router.delete('/deleteAll', outputTypeController.deleteAllOutputTypes);
router.delete('/delete', outputTypeController.deleteOutputTypesById);

module.exports = router;
