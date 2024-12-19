const express = require("express");
const router = express.Router();

const AdminBoatController = require("../controllers/adminboatController");

router.get("/getAllboats",AdminBoatController.getallboattype)
router.post("/search/filter",AdminBoatController.filterBoats)
module.exports = router

