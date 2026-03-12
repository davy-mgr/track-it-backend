const db = require('../config/db');

const createCompany = async ({
  company_name,
  industry,
  country,
  company_size,
  website,
  contact_name,
  contact_email,
  contact_phone,
  description 
}) => {
  const result = await db.query(
    `INSERT INTO companies
     (company_name, industry, country, company_size, website, contact_name, contact_email, contact_phone, description, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,CURRENT_TIMESTAMP)
     RETURNING *`,
    [company_name, industry, country, company_size, website, contact_name, contact_email, contact_phone, description]
  );
  return result.rows[0];
};

const fetchAllCompanies = async () => {
  const result = await db.query(
    `SELECT id, company_name, industry, country, company_size, website, contact_name, contact_email, contact_phone, description, created_at
     FROM companies ORDER BY id ASC`
  );
  return result.rows;
};

const fetchCompanyById = async (id) => {
  const result = await db.query(`SELECT * FROM companies WHERE id = $1`, [id]);
  return result.rows[0];
};

const updateCompany = async (id, data) => {
  const {
    company_name,
    industry,
    country,
    company_size,
    website,
    contact_name,
    contact_email,
    contact_phone,
    description
  } = data;

  const result = await db.query(
    `UPDATE companies
     SET company_name=$1, industry=$2, country=$3, company_size=$4, website=$5, contact_name=$6,
         contact_email=$7, contact_phone=$8, description=$9, updated_at=CURRENT_TIMESTAMP
     WHERE id=$10
     RETURNING *`,
    [company_name, industry, country, company_size, website, contact_name, contact_email, contact_phone, description, id]
  );
  return result.rows[0];
};

const deleteCompany = async (id) => {
  const result = await db.query(`DELETE FROM companies WHERE id=$1 RETURNING *`, [id]);
  return result.rows[0];
};

module.exports = {
  createCompany,
  fetchAllCompanies,
  fetchCompanyById,
  updateCompany,
  deleteCompany
};