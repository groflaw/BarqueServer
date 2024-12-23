const express = require("express");
const router = express.Router();

const AdminBoatController = require("../controllers/adminboatController");

router.get("/getAllboats", AdminBoatController.getallboattype);
router.post("/search/filter", AdminBoatController.filterBoats);
router.post("/setBoatStatus/:boatId", AdminBoatController.setBoatStatus);
module.exports = router;
