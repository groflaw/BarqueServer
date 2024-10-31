const BoatType = require("../models/boattype");

exports.getallboattype = async (req, res) => {
  try {
    const allboattypes = BoatType.find({});
    res.json({ flag: true, allboattypes });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get all types",
    });
  }
};
