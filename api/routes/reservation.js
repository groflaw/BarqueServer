const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservationController");

router.post("/save", reservationController.saveReservation);
//---------------Get the Booking----------//
router.get("/getReservations/:userId", reservationController.getReservations);
router.get("/getBookings/:hostId", reservationController.getBookings);
router.get("/getBoatBookings/:boatId", reservationController.getBoatBookings);
//----------------check news--------------//
router.get("/getHostNews/:hostId", reservationController.getHostNews);
router.get("/getUserNews/:userId", reservationController.getUserNews);
//----------------check reviews-----------//
router.post("/checkUserReview/:userId", reservationController.checkUserReview);
router.post("/checkHostReview/:hostId", reservationController.checkHostReview);
//----------------Host Confirm------------//
router.post("/setBookStatus/:bookId", reservationController.setBookStatus);
//----------------Request Cancel-----------//
router.get("/reqCancel/:bookId", reservationController.reqCancel);

module.exports = router;
