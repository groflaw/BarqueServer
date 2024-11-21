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
router.post("/changeProfile/:id", userController.changeProfile);
router.post("/setNotifi/:id", userController.setNotifi);
// router.post(
//   "/addCoHost/:id",
//   upload.fields([
//     { name: "profileImage", maxCount: 1 },
//     { name: "frontID", maxCount: 1 },
//     { name: "backID", maxCount: 1 },
//   ]),
//   userController.addCoHost
// );
module.exports = router;
