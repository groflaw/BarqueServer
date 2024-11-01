const express = require("express");
const router = express.Router();
const boatController = require("../controllers/boatController");
router.get("/getalltype", boatController.getallboattype);
router.post("/addboattype", boatController.addboattype);
router.post("/addbrand", boatController.addbrand);
router.get("/getallbrand", boatController.getallbrand);
module.exports = router;
