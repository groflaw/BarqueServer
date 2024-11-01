const BoatType = require("../models/boattype");
const Brand = require("../models/brand");
exports.getallboattype = async (req, res) => {
  try {
    const allboattypes = await BoatType.find({});
    res.json({
      flag: true,
      data: allboattypes,
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "boattype",
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

exports.addbrand = async (req, res) => {
  try {
    const newbrand = new Brand(req.body);

    await newbrand.save();

    res.json({ flag: true, newbrand });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could add boat brand",
    });
  }
};

exports.getallbrand = async (req, res) => {
  try {
    const allbrand = await Brand.find({});
    res.json({
      flag: true,
      data: allbrand,
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "brand",
      error: "Could not get all brand",
    });
  }
};
