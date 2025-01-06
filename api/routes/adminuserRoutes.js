const express = require("express");
const router = express.Router();

const AdminUserController = require("../controllers/adminuserController");

router.get("/getAllusers", AdminUserController.getAllUsers);
router.post("/updateInfo/:userId", AdminUserController.updateInfo);
router.post("/blockUser/:userId", AdminUserController.blockUser);
router.get("/", AdminUserController.getAllAdmins);
router.post("/", AdminUserController.updateAdmin);
router.put("/:adminId", AdminUserController.updateAdmin);
router.delete("/:adminId", AdminUserController.deleteAdmin);

module.exports = router;
