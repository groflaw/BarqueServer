const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservationController")

router.post("/save", reservationController.saveReservation);
router.get("/getReservations/:userId",reservationController.getReservations)
router.get("/getBookings/:hostId", reservationController.getBookings)
//----------------check news--------------//
router.get("/getHostNews/:hostId",reservationController.getHostNews)
router.get("/getUserNews/:userId",reservationController.getUserNews)


module.exports = router;
