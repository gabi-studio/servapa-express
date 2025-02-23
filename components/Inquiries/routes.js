const express = require("express");
const router = express.Router();
const inquiriesController = require("./controller");

// getting in

router.get("/", inquiriesController.getAllInquiries);

// adding an inquiry
router.post("/add", inquiriesController.addInquiry);

// deleting an inquiry
router.get("/delete/:id", inquiriesController.deleteInquiry);

module.exports = router;