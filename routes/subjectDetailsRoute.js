const express = require("express");
const router = express.Router();
const subjDetails = require("../controller/subjectDetailController");

router.get("/", subjDetails.getAllSubjectDetials);
router.get("/get/:id", subjDetails.getByIdSubjectDetails);
router.post("/new", subjDetails.createNewSubjectDetails);
router.put("/:id", subjDetails.updateSubjectsDetails);
router.delete("/deleteAll", subjDetails.deleteAllSubjectsDetails);
router.delete("/delete/:id", subjDetails.deleteByIdSubjectDetails);

module.exports = router;