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
    const boatType = req.body.name;
    let basicset = await basicboat.findOne({});
    if (basicset) {
      if (!basicset.types.some((type) => type.name === boatType)) {
        basicset.types.push({
          _id: basicset.types.length + 1,
          name: boatType,
        });

        await basicset.save();
      }

      return res.json({ flag: true, data: basicset.types });
    } else {
      basicset = new basicboat();
      basicset.types.push({ _id: 0, name: boatType });

      await basicset.save();
      return res.json({ flag: true, data: basicset.types });
    }
  } catch (error) {
    return res.json({
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
    const boatBrand = req.body.name;
    let basicset = await basicboat.findOne({});
    if (basicset) {
      if (!basicset.brands.some((type) => type.name === boatBrand)) {
        basicset.brands.push({
          _id: basicset.brands.length + 1,
          name: boatBrand,
        });

        await basicset.save();
      }

      return res.json({ flag: true, data: basicset.brands });
    } else {
      basicset = new basicboat();
      basicset.brands.push({ _id: 0, name: boatBrand });

      await basicset.save();
      return res.json({ flag: true, data: basicset.brands });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not add boat brand",
    });
  }
};

exports.getallboatpower = async (req, res) => {
  try {
    const boatPower = req.body.name;
    let basicset = await basicboat.findOne({});
    if (basicset) {
      if (!basicset.powers.some((type) => type.name === boatPower)) {
        basicset.powers.push({
          _id: basicset.brands.length + 1,
          name: boatPower,
        });

        await basicset.save();
      }

      return res.json({ flag: true, data: basicset.powers });
    } else {
      basicset = new basicboat();
      basicset.powers.push({ _id: 0, name: boatPower });

      await basicset.save();
      return res.json({ flag: true, data: basicset.powers });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not add boat brand",
    });
  }
};
exports.addboatpower = async (req, res) => {
  try {
    const boatPower = req.body.name;
    let basicset = await basicboat.findOne({});
    if (basicset) {
      if (!basicset.powers.some((type) => type.name === boatPower)) {
        basicset.powers.push({
          _id: basicset.powers.length + 1,
          name: boatPower,
        });

        await basicset.save();
      }

      return res.json({ flag: true, data: basicset.powers });
    } else {
      basicset = new basicboat();
      basicset.powers.push({ _id: 0, name: boatPower });

      await basicset.save();
      return res.json({ flag: true, data: basicset.powers });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not add boat power",
    });
  }
};

exports.setEnginesCount = async (req, res) => {
  try {
    let basicset = await basicboat.findOne({});
    if (basicset) {
      basicset.enginecount = req.body.count;
      await basicset.save();
      res.json({ flag: true, enginecount: basicset.enginecount });
    } else {
      basicset = new basicboat();
      basicset.enginecount = req.body.count;
      await basicset.save();
      res.json({ flag: true, enginecount: basicset.enginecount });
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
    let resultArray = Array.from({ length: basicset.enginecount }, (_, i) => ({
      _id: i + 1,
      name: i + 1 + "",
    }));

    if (basicset) {
      res.json({
        flag: true,
        data: resultArray, // Returning engine count from basicboat
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

exports.setBathroomCount = async (req, res) => {
  try {
    let basicset = await basicboat.findOne({});
    if (basicset) {
      basicset.bathroomcount = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.bathroomcount });
    } else {
      basicset = new basicboat();
      basicset.bathroomcount = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.enginecount });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not set engines count",
    });
  }
};
exports.getBathroomCount = async (req, res) => {
  try {
    const basicset = await basicboat.findOne({});
    let resultArray = Array.from(
      { length: basicset.bathroomcount },
      (_, i) => ({
        _id: i + 1,
        name: i + 1 + "",
      })
    );

    if (basicset) {
      res.json({
        flag: true,
        data: resultArray, // Returning engine count from basicboat
      });
    } else {
      res.json({
        flag: false,
        sort: "bathroomcount",
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

exports.setCapacity = async (req, res) => {
  try {
    let basicset = await basicboat.findOne({});
    if (basicset) {
      basicset.capacity = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.capacity });
    } else {
      basicset = new basicboat();
      basicset.capacity = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.capacity });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not set engines count",
    });
  }
};
exports.getCapacity = async (req, res) => {
  try {
    const basicset = await basicboat.findOne({});
    let resultArray = Array.from({ length: basicset.capacity }, (_, i) => ({
      _id: i + 1,
      name: i + 1 + "",
    }));

    if (basicset) {
      res.json({
        flag: true,
        data: resultArray, // Returning engine count from basicboat
      });
    } else {
      res.json({
        flag: false,
        sort: "capacity",
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

exports.setCabinscount = async (req, res) => {
  try {
    let basicset = await basicboat.findOne({});
    if (basicset) {
      basicset.cabinscount = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.cabinscount });
    } else {
      basicset = new basicboat();
      basicset.cabinscount = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.cabinscount });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not set engines count",
    });
  }
};
exports.getCabinscount = async (req, res) => {
  try {
    const basicset = await basicboat.findOne({});
    let resultArray = Array.from({ length: basicset.cabinscount }, (_, i) => ({
      _id: i + 1,
      name: i + 1 + "",
    }));

    if (basicset) {
      res.json({
        flag: true,
        data: resultArray, // Returning engine count from basicboat
      });
    } else {
      res.json({
        flag: false,
        sort: "cabinscount",
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
