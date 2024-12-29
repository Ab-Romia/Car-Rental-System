const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route to search available cars
router.get('/car/', searchController.searchAvailableCars);

// Route to perform advanced search
router.get('/adv', searchController.advancedSearch);

module.exports = router;