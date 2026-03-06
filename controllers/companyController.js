const {
  createCompany,
  fetchAllCompanies,
  fetchCompanyById,
  updateCompany,
  deleteCompany
} = require('../models/companyModel');

const db = require('../config/db');

// Create a new company
const addCompany = async (req, res) => {
  try {
    const company = await createCompany(req.body);
    res.status(201).json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all companies
const getCompanies = async (req, res) => {
  try {
    const companies = await fetchAllCompanies();
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single company by ID
const getCompanyById = async (req, res) => {
  try {
    const company = await fetchCompanyById(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a company
const editCompany = async (req, res) => {
  try {
    const company = await updateCompany(req.params.id, req.body);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a company
const removeCompany = async (req, res) => {
  try {
    const company = await deleteCompany(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json({ message: 'Company deleted', company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addCompany,
  getCompanies,
  getCompanyById,
  editCompany,
  removeCompany
};