const express = require('express');
const router = express.Router();
const { fetchDashboard } = require('../controllers/dashboardController');

router.get('/', fetchDashboard);

module.exports = router;