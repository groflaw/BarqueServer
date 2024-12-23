const Boat = require("../models/boat");
const Users = require("../models/user");
const Reservation = require("../models/reservation");

exports.getAllBooking = async (req, res) => {
  try {
    const bookings = await Reservation.find({})
      .populate({
        path: "userId",
        select: "firstName lastName",
      })
      .populate({
        path: "hostId",
        select: "firstName lastName",
      })
      .populate({
        path: "boatId",
        select: "model plans location1 location2",
      });

    const bookingDetails = bookings.map((reservation) => ({
      _id: reservation._id,
      guestName:
        reservation.userId?.firstName + " " + reservation.userId?.lastName,
      hostName:
        reservation.hostId?.firstName + " " + reservation.hostId?.lastName,
      boatName: reservation.boatId?.model,
      date: reservation.date,
      plan: reservation.planId,
      price: reservation.boatId.plans.filter(
        (plan) => plan._id === reservation.planId
      )[0].price,
      status: reservation.status,
      boatLocation: reservation.boatId.location2.marinaname,
      boatAddress: reservation.boatId.location2.address,
      location: reservation.boatId.location1,
    }));

    res.json({
      flag: true,
      data: bookingDetails,
    });
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.status(500).json({
      flag: false,
      general: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};
