const express = require("express");
const router = express.Router();

const AdminBoatController = require("../controllers/adminboatController");

router.get("/getAllboats", AdminBoatController.getallboattype);
router.post("/search/filter", AdminBoatController.filterBoats);
router.post("/setBoatStatus/:boatId", AdminBoatController.setBoatStatus);
router.get("/getAllReviews", AdminBoatController.getAllReviews);
router.post("/setHostReview/:boatId", AdminBoatController.setHostReview);
router.get(
  "/delHostReview/:boatId/:reviewId",
  AdminBoatController.deleteHostReview
);
module.exports = router;
