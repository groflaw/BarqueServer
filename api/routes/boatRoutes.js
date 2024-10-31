const express = require("express");
const router = express.Router();
const boatController = require("../controllers/boatController");
router.get("/getalltype", boatController.getallboattype);
module.exports = router;
