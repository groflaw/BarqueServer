const basicboat = require("../models/basicboat");

exports.getallboattype = async (req, res) => {
  try {
    const basicset = await basicboat.findOne({});
    res.json({
      flag: true,
      data: basicset.types,
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
    const basicset = await basicboat.findOne({});
    basicset.types.push(req.body.name);
    basicset.save();
    res.json({ flag: true, data: basicset.types });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could add boat type",
    });
  }
};

exports.getallboatbrand = async (req, res) => {
  try {
    const basicset = await basicboat.findOne({});
    res.json({
      flag: true,
      data: basicset.types,
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "boattype",
      error: "Could not get all types",
    });
  }
};

exports.addboatbrand = async (req, res) => {
  try {
    const basicset = await basicboat.findOne({});
    basicset.types.push(req.body.name);
    basicset.save();
    res.json({ flag: true, data: basicset.types });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could add boat type",
    });
  }
};

exports.setEnginesCount = async (req, res) => {
  try {
    const now = Engines.findOne({});
    now.count = req.body.count;
    await now.save();
    res.json({ flag: true, now });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could add boat brand",
    });
  }
};

exports.getEnginesCount = async (req, res) => {
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
