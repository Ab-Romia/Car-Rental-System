const express = require("express");
const router = express.Router();
const officeController = require("../controllers/officeController");
const { isAuthenticated } = require("../middleware/auth");

router.post("/add", isAuthenticated, async (req, res) => {
    const result = await officeController.createOffice(req);
    res.status(result.statusCode).json(result.body);
});

router.get("/all", isAuthenticated, async (req, res) => {
    const result = await officeController.getAllOffices();
    res.status(result.statusCode).json(result.body);
});

module.exports = router;
