const db = require('../config/db');

const createOnboarding = async ({ company_id, assigned_to, status, notes }) => {
  const result = await db.query(
    `INSERT INTO onboarding (company_id, assigned_to, status, notes, created_at, updated_at)
     VALUES ($1,$2,$3,$4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
     RETURNING *`,
    [company_id, assigned_to, status, notes]
  );
  return result.rows[0];
};

const updateOnboarding = async (id, { status, assigned_to, notes }) => {
  const result = await db.query(
    `UPDATE onboarding
     SET status=$1, assigned_to=$2, notes=$3, updated_at=CURRENT_TIMESTAMP
     WHERE id=$4
     RETURNING *`,
    [status, assigned_to, notes, id]
  );
  return result.rows[0];
};

const fetchDashboard = async () => {
  const result = await db.query(
    `SELECT o.id AS onboarding_id, c.company_name, c.industry, c.country,
            u.first_name || ' ' || u.last_name AS assigned_user,
            o.status, o.notes, o.created_at, o.updated_at
     FROM onboarding o
     JOIN companies c ON o.company_id = c.id
     JOIN users u ON o.assigned_to = u.id
     ORDER BY o.created_at ASC`
  );
  return result.rows;
};

const fetchOnboardingById = async (id) => {
  const result = await db.query(`SELECT * FROM onboarding WHERE id=$1`, [id]);
  return result.rows[0];
};

module.exports = { createOnboarding, updateOnboarding, fetchDashboard, fetchOnboardingById };