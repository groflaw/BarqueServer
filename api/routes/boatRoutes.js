const express = require("express");
const router = express.Router();
const boatController = require("../controllers/boatController");
router.get("/getalltype", boatController.getallboattype);
router.post("/addboattype", boatController.addboattype);
module.exports = router;
