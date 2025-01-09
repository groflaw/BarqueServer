const Reservation = require("../models/reservation");
const Chat = require("../models/chat");
const User = require("../models/user");
const Boat = require("../models/boat");

exports.saveReservation = async (req, res) => {
  try {
    const boat = await Boat.findOne({ _id: req.body.boatId });
    boat.free = false;
    await boat.save();

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
    const reservations = await Reservation.find({
      userId: req.params.userId,
      status: { $lte: 3 },
    })
      .populate(
        "hostId",
        "_id firstName lastName avatar phoneNumber review booking"
      )
      .populate(
        "boatId",
        "_id model description boatImage.cover location2 boattype capacity location1 plans cancellation"
      );
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
    const bookings = await Reservation.find({
      hostId: req.params.hostId,
      status: { $lte: 3 },
    })
      .populate(
        "userId",
        "_id firstName lastName avatar phoneNumber review booking"
      )
      .populate(
        "boatId",
        "_id model description boatImage.cover location2 boattype capacity location1 plans cancellation"
      );
    res.json({ flag: true, data: bookings });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get bookings",
    });
  }
};

exports.getBoatBookings = async (req, res) => {
  try {
    const bookings = await Reservation.find({
      boatId: req.params.boatId,
      status: { $ne: 1 },
    });
    res.json({
      flag: true,
      data: bookings,
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get boat bookings",
    });
  }
};

exports.getHostNews = async (req, res) => {
  try {
    const news = await Reservation.find({
      status: 0,
      hostId: req.params.hostId,
    });
    res.json({ flag: true, data: news?.length > 0 ? true : false });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get bookings",
    });
  }
};

exports.getUserNews = async (req, res) => {
  try {
    const news = await Reservation.find({
      status: 2,
      userId: req.params.userId,
    });
    res.json({ flag: true, data: news.length > 0 ? true : false });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get bookings",
    });
  }
};

exports.setBookStatus = async (req, res) => {
  try {
    let book = await Reservation.findOne({ _id: req.params.bookId });
    book.status = req.body.value;
    await book.save();
    res.json({
      flag: true,
      data: book,
    });
  } catch (error) {
    res.json({
      false: false,
      sort: "general",
      error: "Could not confirm",
    });
  }
};

exports.checkUserReview = async (req, res) => {
  try {
    const today = new Date(req.body.today);
    today.setHours(0, 0, 0, 0);
    const reviews = await Reservation.find({
      end: {
        $gte: today,
      },
      status: 3,
      userId: req.params.userId,
    }).populate("boatId", "_id model boatImage.cover");
    res.json({ flag: true, data: reviews });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get Reviews",
    });
  }
};

exports.checkHostReview = async (req, res) => {
  try {
    const today = new Date(req.body.today);
    today.setHours(0, 0, 0, 0);
    const reviews = await Reservation.find({
      end: {
        $gte: today,
      },
      status: 4,
      hostId: req.params.hostId,
    }).populate("userId", "_id firstName lastName avatar");
    res.json({ flag: true, data: reviews });
  } catch (eror) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get Reviews",
    });
  }
};

exports.reqCancel = async (userId) => {
  try {
    const customers = await User.find({ role: 3 });
    const messages = customers.map((customer) => {
      return {
        sender: userId,
        receiver: customer._id,
        content:
          "I hope this message finds you well. I would like to kindly request the cancellation of my boat booking. Thank you for your assistance.",
      };
    });

    if (messages?.length > 0) {
      await Chat.insertMany(messages);
      return {
        flag: true,
        data: messages,
      };
    } else {
      return {
        flag: false,
        sort: "general",
        error: "No customers.",
      };
    }
  } catch (error) {
    return {
      flag: false,
      sort: "general",
      error: "Could not send rquest",
    };
  }
};
