const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservationController")

router.post("/save", reservationController.saveReservation);
router.get("/getReservations/:userId",reservationController.getReservations)

module.exports = router;
