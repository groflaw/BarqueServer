const Reservation = require("../models/reservation");
const Boat = require("../models/boat");

exports.saveReservation = async (req,res) =>{
    try{
        const newreservation = new Reservation(req.body);
        await newreservation.save();
        res.json({flag : true, data : newreservation})
    }catch(error){
        res.json({ flag: false, sort: "general", error: "Could not create reservation" });
    }
}

