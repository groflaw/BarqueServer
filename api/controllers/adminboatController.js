const Boat = require("../models/boat");
const Users = require("../models/user");

exports.getallboattype = async (req, res) => {
  try {
    const boats = await Boat.find({})
    .select("location2 user location1 status date")
    .populate("user","_id firstName lastName")
    res.json({
        flag: true,
        data: boats,
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
