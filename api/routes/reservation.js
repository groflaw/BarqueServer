const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservationController")

router.post("/save", reservationController.saveReservation);
router.get("/getReservations/:userId",reservationController.getReservations)
router.get("/getBookings/:hostId", reservationController.getBookings)

module.exports = router;
