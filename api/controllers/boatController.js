const basicboat = require("../models/basicboat");

exports.getallboattype = async (req, res) => {
  try {
    const basicset = await basicboat.findOne({});
    res.json({
      flag: true,
      data: basicset ? basicset.types : [], // Handles case if no document found
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
    let basicset = await basicboat.findOne({});
    if (basicset) {
      if (!basicset.types.includes(req.body.name)) {
        basicset.types.push({
          _id: basicset.types.length() + 1,
          name: req.body.name,
        });
        await basicset.save();
      }
      res.json({ flag: true, data: basicset.types });
    } else {
      basicset = new basicboat();
      basicset.types.push({ _id: 0, name: req.body.name });
      await basicset.save();
      res.json({ flag: true, data: basicset.types });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not add boat type",
    });
  }
};

exports.getallboatbrand = async (req, res) => {
  try {
    const basicset = await basicboat.findOne({});
    res.json({
      flag: true,
      data: basicset ? basicset.brands : [], // Corrected to brands
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "boatbrand",
      error: "Could not get all brands",
    });
  }
};

exports.addboatbrand = async (req, res) => {
  try {
    let basicset = await basicboat.findOne({});
    if (basicset) {
      if (!basicset.brands.includes(req.body.name)) {
        basicset.brands.push({
          _id: basicset.brands.length() + 1,
          name: req.body.name,
        });
        await basicset.save(); // Await the save operation
      }
      res.json({ flag: true, data: basicset.brands });
    } else {
      basicset = new basicboat();
      basicset.types.push(req.body.name);
      await basicset.save();
      res.json({ flag: true, data: basicset.types });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not add boat brand",
    });
  }
};

exports.setEnginesCount = async (req, res) => {
  try {
    let basicset = await basicboat.findOne({});
    if (basicset) {
      basicset.enginecount = req.body.count;
      await basicset.save();
      res.json({ flag: true, count: basicset.enginecount });
    } else {
      basicset.enginecount = req.body.count;
      await basicset.save();
      res.json({ flag: true, count: basicset.enginecount });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not set engines count",
    });
  }
};

exports.getEnginesCount = async (req, res) => {
  try {
    const basicset = await basicboat.findOne({});
    if (basicset) {
      res.json({
        flag: true,
        data: { enginecount: basicset.enginecount }, // Returning engine count from basicboat
      });
    } else {
      res.json({
        flag: false,
        sort: "enginecount",
        error: "Boat configuration not found.",
      });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get engine count",
    });
  }
};
