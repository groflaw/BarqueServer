const Boat = require("../models/boat");
const Users = require("../models/user");

exports.getallboattype = async (req, res) => {
  try {
    const boats = await Boat.find({ delete: false })
      .select("location2 user location1 status date model")
      .populate("user", "_id firstName lastName");
    res.json({
      flag: true,
      data: boats,
    });
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.status(500).json({
      flag: false,
      sort: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};

exports.filterBoats = async (req, res) => {
  try {
    const { size, boattype, capacity, price, any } = req.body;
    let boats = [];
    const baseQuery = {
      delete: false,
    };
    if (any) {
      const queryConditions = [];
      if (size) queryConditions.push({ size });
      if (boattype) queryConditions.push({ boattype });
      if (capacity) queryConditions.push({ capacity });
      if (price) {
        queryConditions.push({
          $or: [
            { plans: { $elemMatch: { price: { $gte: price } } } },
            { plans: { $exists: false } },
          ],
        });
      }
      boats = await Boat.find({ $and: [baseQuery, { $or: queryConditions }] })
        .select("location2 user location1 status date model")
        .populate("user", "_id firstName lastName");
      res.json({
        flag: true,
        data: boats,
      });
    } else {
      if (size) baseQuery.size = size;
      if (boattype) baseQuery.boattype = boattype;
      if (capacity) baseQuery.capacity = capacity;
      boats = await Boat.find(baseQuery)
        .select("location2 user location1 status date model")
        .populate("user", "_id firstName lastName")
        .lean();
      if (price)
        boats = boats.filter((boat) => {
          const firstPlanPrice = boat.plans?.[0]?.price || 0;
          const lastPlanPrice = boat.plans?.[boat.plans.length - 1]?.price || 0;
          return firstPlanPrice >= price || lastPlanPrice >= price; // Check using provided logic
        });
      res.json({
        flag: true,
        data: boats,
      });
    }
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.status(500).json({
      flag: false,
      sort: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};

exports.setBoatStatus = async (req, res) => {
  try {
    const { sort, result } = req.body;
    const boat = await Boat.findOne({ _id: req.params.boatId });
    boat.status[sort] = result;
    await boat.save();
    res.json({
      flag: true,
      data: boat,
    });
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.status(500).json({
      flag: false,
      sort: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const boats = await Boat.findOne({
      $expr: { $gt: [{ $size: "$reviews" }, 0] },
      delete: false,
    }).populate({
      path: "reviews.customer",
      select: "firstName lastName",
    });

    res.json({
      flag: true,
      data: boats,
    });
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.status(500).json({
      flag: false,
      sort: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};
