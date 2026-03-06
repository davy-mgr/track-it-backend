const express = require('express');
const router = express.Router();
const {
  addCompany,
  getCompanies,
  getCompanyById,
  editCompany,
  removeCompany
} = require('../controllers/companyController');

const { adminOnly } = require('../middleware/authMiddleware');

// Public read (optional, for dashboard)
router.get('/', getCompanies);
router.get('/:id', getCompanyById);

// Admin-only routes
router.post('/', adminOnly, addCompany);
router.put('/:id', adminOnly, editCompany);
router.delete('/:id', adminOnly, removeCompany);

module.exports = router;