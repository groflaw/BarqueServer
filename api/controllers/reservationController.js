const Reservation = require("../models/reservation");

exports.saveReservation = async (req, res) => {
  try {
    const newreservation = new Reservation(req.body);
    await newreservation.save();
    res.json({ flag: true, data: newreservation });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not create reservation",
    });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.params.userId })
      .populate("hostId", "_id firstName lastName avatar phoneNumber")
      .populate("boatId", "_id model description boatImage.cover location2 boattype capacity location1 plans");
    res.json({ flag: true, data: reservations });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get reservations",
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Reservation.find({ hostId: req.params.hostId })
      .populate("userId", "_id firstName lastName avatar phoneNumber")
      .populate("boatId", "_id model description boatImage.cover location2 boattype capacity location1 plans");
    res.json({ flag: true, data: bookings });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get bookings",
    });
  }
};