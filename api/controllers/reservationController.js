const Reservation = require("../models/reservation");
const Boat = require("../models/boat");

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
    const reservations = Reservation.find({ userId: req.params.userId })
      .populate("userId", "_id firstName lastName avatar")
      .populate("boatId", "_id model description");
    res.json({ flag: true, data : reservations });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not create reservation",
    });
  }
};
