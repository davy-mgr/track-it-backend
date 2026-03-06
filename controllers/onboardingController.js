const {
  createOnboarding,
  updateOnboarding,
  fetchDashboard,
  fetchOnboardingById
} = require('../models/onboardingModel');

// Create new onboarding record
const addOnboarding = async (req, res) => {
  try {
    const record = await createOnboarding(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update existing onboarding record
const editOnboarding = async (req, res) => {
  try {
    const record = await updateOnboarding(req.params.id, req.body);
    if (!record) return res.status(404).json({ error: 'Onboarding record not found' });
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Fetch dashboard view
const getDashboard = async (req, res) => {
  try {
    const dashboard = await fetchDashboard();
    res.json(dashboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single onboarding by ID
const getOnboardingById = async (req, res) => {
  try {
    const record = await fetchOnboardingById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Onboarding record not found' });
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addOnboarding, editOnboarding, getDashboard, getOnboardingById };