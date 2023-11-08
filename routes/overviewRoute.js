const express = require("express");
const router = express.Router();
const overviewController = require('../controller/overviewController');

router.get('/', overviewController.getAllOverview);
router.post('/new', overviewController.createOverview);
router.put('/:id', overviewController.updateOverview);
router.delete('/deleteAll', overviewController.deleteAllOverview);
router.delete('/delete', overviewController.deleteByIdOverview);

module.exports = router;