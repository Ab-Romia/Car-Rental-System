const express = require("express");
const router = express.Router();
const officeController = require("../controllers/officeController");

router.post("/add", officeController.createOffice);
router.get("/all", officeController.getAllOffices);

module.exports = router;
