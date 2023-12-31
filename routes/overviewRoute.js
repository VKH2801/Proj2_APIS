const express = require("express");
const router = express.Router();
const overviewController = require('../controller/overviewController');

router.get('/', overviewController.getAllOverview);
router.get('/get/:id', overviewController.getOverviewById)
router.post('/new', overviewController.createOverview);
router.put('/:id', overviewController.updateOverview);
router.delete('/deleteAll', overviewController.deleteAllOverview);
router.delete('/delete/:id', overviewController.deleteByIdOverview);

module.exports = router;