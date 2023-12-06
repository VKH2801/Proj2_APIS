const express = require("express");
const router = express.Router();
const GenKnowledge = require('../controller/generalKnowledgeController');

router.get('/', GenKnowledge.getAllGeneralKnowledge);
router.get('/get/:id', GenKnowledge.getByIdGeneralKnowledge);
router.post('/new', GenKnowledge.createNewGeneralKnowledge);
router.put('/:id', GenKnowledge.updateGeneralKnowledge);
router.delete('/deleteAll', GenKnowledge.deleteAllGeneralKnowledge);
router.delete('/delete/:id', GenKnowledge.deleteByIdGeneralKnowledge);
module.exports = router;