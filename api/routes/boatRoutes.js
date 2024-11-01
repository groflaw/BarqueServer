const express = require("express");
const router = express.Router();

const boatController = require("../controllers/boatController");

router.post("/addboattype", boatController.addboattype);
router.get("/getallboattype", boatController.getallboattype);

router.get("/getallboatbrand", boatController.getallboatbrand);
router.post("/addboatbrand", boatController.addboatbrand);

router.get("/getallboatpower", boatController.getallboatpower);
router.post("/addboatpower", boatController.addboatpower);

router.post("/setEnginesCount", boatController.setEnginesCount);
router.get("/getEnginesCount", boatController.getEnginesCount);

module.exports = router;
