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
      .populate("hostId", "_id firstName lastName avatar phoneNumber review booking")
      .populate("boatId", "_id model description boatImage.cover location2 boattype capacity location1 plans cancellation");
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
      .populate("userId", "_id firstName lastName avatar phoneNumber review booking")
      .populate("boatId", "_id model description boatImage.cover location2 boattype capacity location1 plans cancellation");
    res.json({ flag: true, data: bookings });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get bookings",
    });
  }
};

exports.getHostNews = async(req,res)=>{
  try{
    const news = await Reservation.find({status : 0, hostId : req.params.hostId})
    res.json({flag : true, data : news.length > 0 ? true : false})
  }catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get bookings",
    });
  }
}

exports.getUserNews = async(req,res)=>{
  try{
    const news = await Reservation.find({status : 2, userId : req.params.userId})
    res.json({flag : true, data : news.length > 0 ? true : false})
  }catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get bookings",
    });
  }
}

exports.setBookStatus = async(req,res)=>{
  try{
    let book = await Reservation.findOne({_id : req.params.bookId})
    book.status = req.body.status ;
    await book.save();
    res.json({
      flag : true,
      data : book
    })
  }catch(error){
    res.json({
      false : false,
      sort : "general",
      error : "Could not confirm"
    })
  }
}