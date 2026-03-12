const {
  createCompany,
  fetchAllCompanies,
  fetchCompanyById,
  updateCompany,
  deleteCompany
} = require('../models/companyModel');

const db = require('../config/db');

const addCompany = async (req, res) => {
  try {
    const company = await createCompany(req.body);
    res.status(201).json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await fetchAllCompanies();
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

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