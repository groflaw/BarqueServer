const BasicBoat = require("../models/basicboat");
const Boat = require("../models/boat");

exports.getallboattype = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
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
    let basicset = await BasicBoat.findOne({});
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
      basicset = new BasicBoat();
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
    const basicset = await BasicBoat.findOne({});
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
    let basicset = await BasicBoat.findOne({});
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
      basicset = new BasicBoat();
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
    const basicset = await BasicBoat.findOne({});
    res.json({
      flag: true,
      data: basicset ? basicset.powers : [], // Corrected to brands
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "powers",
      error: "Could not get all powers",
    });
  }
};
exports.addboatpower = async (req, res) => {
  try {
    const boatPower = req.body.name;
    let basicset = await BasicBoat.findOne({});
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
      basicset = new BasicBoat();
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
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      basicset.enginecount = req.body.count;
      await basicset.save();
      res.json({ flag: true, enginecount: basicset.enginecount });
    } else {
      basicset = new BasicBoat();
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
    const basicset = await BasicBoat.findOne({});
    let resultArray = Array.from({ length: basicset.enginecount }, (_, i) => ({
      _id: i + 1,
      name: i + 1 + "",
    }));

    if (basicset) {
      res.json({
        flag: true,
        data: resultArray, // Returning engine count from BasicBoat
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
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      basicset.bathroomcount = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.bathroomcount });
    } else {
      basicset = new BasicBoat();
      basicset.bathroomcount = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.enginecount });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not set bathroom count",
    });
  }
};
exports.getBathroomCount = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
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
        data: resultArray, // Returning engine count from BasicBoat
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
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      basicset.capacity = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.capacity });
    } else {
      basicset = new BasicBoat();
      basicset.capacity = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.capacity });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not set capacity",
    });
  }
};
exports.getCapacity = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    let resultArray = Array.from({ length: basicset.capacity }, (_, i) => ({
      _id: i + 1,
      name: i + 1 + "",
    }));

    if (basicset) {
      res.json({
        flag: true,
        data: resultArray, // Returning engine count from BasicBoat
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
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      basicset.cabinscount = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.cabinscount });
    } else {
      basicset = new BasicBoat();
      basicset.cabinscount = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.cabinscount });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not set Cabins count",
    });
  }
};
exports.getCabinscount = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    let resultArray = Array.from({ length: basicset.cabinscount }, (_, i) => ({
      _id: i + 1,
      name: i + 1 + "",
    }));

    if (basicset) {
      res.json({
        flag: true,
        data: resultArray, // Returning engine count from BasicBoat
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

exports.addBoat = async (req, res) => {
  try {
    const newboat = new Boat(req.body);
    await newboat.save();
    res.json({ flag: true, data: newboat });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "There is unknown error, Please try again.",
    });
  }
};
exports.getboatbasicInfo = async (req, res) => {
  try {
    const boat = Boat.findById(req.params.id);
    if (boat) {
      res.json({
        fkag: true,
        data: {
          model: boat.model,
          description: boat.description,
          location: boat.location,
          year: boat.year,
          size: boat.size,
          boattype: boat.boattype,
          boatbrand: boat.boatbrand,
          enginecount: boat.enginecount,
          bathroomcount: boat.bathroomcount,
          power: boat.power,
          capacity: boat.capacity,
          cabinscount: boat.cabinscount,
        },
      });
    } else {
      res.json({
        flag: false,
        sort: "general",
        error: "Boat's basic information not found",
      });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "There is unknown error, Please try again",
    });
  }
};
