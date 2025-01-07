const express = require("express");
const multer = require("multer");

const router = express.Router();
const userController = require("../controllers/userController");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", userController.createUser);
router.get("/:email/:password/:expoPushToken", userController.loginUser);
router.post(
  "/setAvatar/:id",
  upload.fields([{ name: "photo" }, { name: "exif" }]),
  userController.setAvatar
);
router.post("/changeProfile/:id", userController.changeProfile);
router.post("/setNotifi/:id", userController.setNotifi);
router.post(
  "/addCoHost/:id",
  upload.fields([
    { name: "profileImage" },
    { name: "frontID" },
    { name: "backID" },
  ]),
  userController.addCoHost
);
router.get("/:id", userController.getUser);
router.post("/changePassword/:id", userController.changePassword);
module.exports = router;
