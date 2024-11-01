const express = require("express");
const router = express.Router();
const boatController = require("../controllers/boatController"); // Ensure this path is correct

router.post("/addboattype", boatController.addboattype);
router.get("/getallboattype", boatController.getallboattype);
router.post("/addboatbrand", boatController.addboatbrand);
router.get("/getallboatbrand", boatController.getallboatbrand);
router.post("/setEnginesCount", boatController.setEnginesCount);
router.get("/getEnginesCount", boatController.getEnginesCount);

module.exports = router;
