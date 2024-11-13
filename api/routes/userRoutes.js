const express = require("express");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
const userController = require("../controllers/userController");
router.post("/", userController.createUser);
router.get("/:email/:password", userController.loginUser);
router.post(
  "/setAvatar/:id",
  upload.fields([{ name: "photo" }, { name: "exif" }]),
  userController.setAvatar
);
module.exports = router;
