const { getDashboardData } = require('../models/dashboardModel');

const fetchDashboard = async (req, res) => {
    try {
        const data = await getDashboardData();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { fetchDashboard };