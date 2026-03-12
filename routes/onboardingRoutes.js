const express = require('express');
const router = express.Router();
const {
  addOnboarding,
  editOnboarding,
  getDashboard,
  getOnboardingById
} = require('../controllers/onboardingController');

const { adminOnly } = require('../middleware/authMiddleware');

router.post('/', adminOnly, addOnboarding);
router.put('/:id', adminOnly, editOnboarding);

router.get('/dashboard', getDashboard);

router.get('/:id', adminOnly, getOnboardingById);

module.exports = router;