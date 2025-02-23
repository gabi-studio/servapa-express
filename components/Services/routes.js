const express = require("express");
const router = express.Router();
const servicesController = require("./controller");

// set up routee for services
router.get("/", servicesController.getAllServices);
router.post("/add", servicesController.addService);
router.get("/delete/:id", servicesController.deleteServiceByName);

module.exports = router;