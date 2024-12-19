const express = require("express");
const router = express.Router();

const AdminBoatController = require("../controllers/adminboatController");

router.get("/getAllboats",AdminBoatController.getallboattype)

module.exports = router

