const express = require("express");
const router = express.Router();
const referenceDocController = require("../controller/referenceDocController");

router.get('/', referenceDocController.getAllReferencesDoc);
router.get('/get/:id', referenceDocController.getRefDocById);
router.post('/new', referenceDocController.createReferencesDoc);
router.put('/:id', referenceDocController.updateReferences);
router.delete('/deleteAll', referenceDocController.deleteAllReferences);
router.delete('/delete', referenceDocController.deleteReferencesById);

module.exports = router;