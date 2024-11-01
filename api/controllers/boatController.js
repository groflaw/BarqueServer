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
    const basicset = await basicboat.findOne({});
    if (basicset) {
      // Check for duplicates if necessary
      if (!basicset.types.includes(req.body.name)) {
        basicset.types.push(req.body.name);
        await basicset.save(); // Await the save operation
      }
      res.json({ flag: true, data: basicset.types });
    } else {
      res.json({
        flag: false,
        sort: "boattype",
        error: "Boat configuration not found.",
      });
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
    const basicset = await basicboat.findOne({});
    if (basicset) {
      if (!basicset.brands.includes(req.body.name)) {
        basicset.brands.push(req.body.name);
        await basicset.save(); // Await the save operation
      }
      res.json({ flag: true, data: basicset.brands });
    } else {
      res.json({
        flag: false,
        sort: "boatbrand",
        error: "Boat configuration not found.",
      });
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
    const basicset = await basicboat.findOne({}); // Use the correct model
    if (basicset) {
      basicset.enginecount = req.body.count; // Setting the engine count
      await basicset.save(); // Await the save operation
      res.json({ flag: true, count: basicset.enginecount });
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
