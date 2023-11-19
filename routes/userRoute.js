const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.put("/:id", userController.updateUser);
router.get("/", userController.getUser);
router.get("/:id", userController.getUserDetail);
router.delete("/deleteBy", userController.deleteUserWith);
router.delete("/delete/:id", userController.deleteUserById);

module.exports = router;
