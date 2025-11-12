const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { isAuthenticated } = require('../middleware/auth');

// Route to search available cars
router.get('/car/', isAuthenticated, searchController.searchAvailableCars);

// Route to perform advanced search
router.get('/adv', isAuthenticated, searchController.advancedSearch);

module.exports = router;