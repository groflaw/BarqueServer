const express = require("express");
const router = express.Router();

const AdminBoatController = require("../controllers/adminuserController");

router.get("/getAllusers", AdminBoatController.getAllUsers);
router.post("/updateInfo/:userId", AdminBoatController.updateInfo);
router.post("/blockUser/:userId", AdminBoatController.blockUser);

module.exports = router;
