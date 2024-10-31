const BoatType = require("../models/boattype");

exports.getallboattype = async (req, res) => {
  try {
    const allboattypes = BoatType.find();
    res.json({ flag: true, allboattypes });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get all types",
    });
  }
};

exports.addboattype = async (req, res) => {
  try {
    const newtype = new BoatType(req.body);

    await newtype.save();

    res.json({ flag: true, newtype });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could add boat type",
    });
  }
};
