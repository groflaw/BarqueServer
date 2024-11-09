const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const boatController = require("../controllers/boatController");

router.post("/addboattype", boatController.addboattype);
router.get("/getallboattype", boatController.getallboattype);

router.get("/getallboatbrand", boatController.getallboatbrand);
router.post("/addboatbrand", boatController.addboatbrand);

router.get("/getallboatpower", boatController.getallboatpower);
router.post("/addboatpower", boatController.addboatpower);

router.post("/setEnginesCount", boatController.setEnginesCount);
router.get("/getEnginesCount", boatController.getEnginesCount);

router.post("/setBathroomCount", boatController.setBathroomCount);
router.get("/getBathroomCount", boatController.getBathroomCount);

router.post("/setCapacity", boatController.setCapacity);
router.get("/getCapacity", boatController.getCapacity);

router.post("/setCabinscount", boatController.setCabinscount);
router.get("/getCabinscount", boatController.getCabinscount);

router.post("/setLocationType", boatController.setLocationType);
router.get("/getLocationType", boatController.getalllocationtype);

//------------------ADDBOAT--------------------//
router.post("/addboat", boatController.addBoat);
router.get("/getbasicInfo/:id", boatController.getboatbasicInfo);

router.post("/addplan/:id", boatController.addPlan);
router.post("/delplan/:id", boatController.delPlan);

router.post(
  "/adddocImage/:id/:type",
  upload.fields([{ name: "photo" }, { name: "exif" }]),
  boatController.addDocImage
);

module.exports = router;
