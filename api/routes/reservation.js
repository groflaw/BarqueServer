const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservationController")

router.post("/save", reservationController.saveReservation);
//---------------Get the Booking----------//
router.get("/getReservations/:userId",reservationController.getReservations)
router.get("/getBookings/:hostId", reservationController.getBookings)
//----------------check news--------------//
router.get("/getHostNews/:hostId",reservationController.getHostNews)
router.get("/getUserNews/:userId",reservationController.getUserNews)
//----------------check reviews-----------//
router.post("/checkReviews",reservationController.checkReviews)
//----------------Host Confirm------------//
router.post("/setBookStatus/:bookId", reservationController.setBookStatus)

module.exports = router;
