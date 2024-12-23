const express = require("express");
const router = express.Router();

const AdminBookingController = require("../controllers/adminbookingController");

router.get("/getAllBooking", AdminBookingController.getAllBooking);

module.exports = router;
