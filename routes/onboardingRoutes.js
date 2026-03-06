const express = require('express');
const router = express.Router();
const {
  addOnboarding,
  editOnboarding,
  getDashboard,
  getOnboardingById
} = require('../controllers/onboardingController');

const { adminOnly } = require('../middleware/authMiddleware');

// Admin-only routes
router.post('/', adminOnly, addOnboarding);
router.put('/:id', adminOnly, editOnboarding);

// Public / admin dashboard view
router.get('/dashboard', getDashboard);

// Get single onboarding record
router.get('/:id', adminOnly, getOnboardingById);

module.exports = router;