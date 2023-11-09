const express = require("express");
const router = express.Router();
const enrollController = require("../controller/enrollController");

router.get('/', enrollController.getAllEnroll);
router.get('/get/:id', enrollController.getEnrollById);
router.post('/new', enrollController.createNewEnroll);
router.put('/:id', enrollController.updateEnroll);
router.delete('deleteAll', enrollController.deleteAllEnroll);
router.delete('/delete', enrollController.deleteEnrollById)

module.exports = router;
