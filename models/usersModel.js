const db = require('../config/db');
const bcrypt = require('bcrypt');

// Create a new user (admin)
const createUser = async ({ first_name, last_name, email, phone, position, username, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.query(
    `INSERT INTO users 
      (first_name, last_name, email, phone, position, username, password, role, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,CURRENT_TIMESTAMP)
     RETURNING id, first_name, last_name, email, phone, position, username, role, created_at`,
    [first_name, last_name, email, phone, position, username, hashedPassword, role]
  );

  return result.rows[0];
};

// Get user by email (for login)
const getUserByEmail = async (email) => {
  const result = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
  return result.rows[0];
};

// Get user by id
const getUserById = async (id) => {
  const result = await db.query(`SELECT id, first_name, last_name, email, phone, position, username, role, created_at FROM users WHERE id=$1`, [id]);
  return result.rows[0];
};

// Update user
const updateUser = async (id, data) => {
  const { first_name, last_name, email, phone, position, username, password, role } = data;

  let hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  const result = await db.query(
    `UPDATE users
     SET first_name=$1, last_name=$2, email=$3, phone=$4, position=$5, username=$6,
         password=COALESCE($7, password), role=$8, updated_at=CURRENT_TIMESTAMP
     WHERE id=$9
     RETURNING id, first_name, last_name, email, phone, position, username, role, created_at`,
    [first_name, last_name, email, phone, position, username, hashedPassword, role, id]
  );

  return result.rows[0];
};

// Delete user
const deleteUser = async (id) => {
  const result = await db.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [id]);
  return result.rows[0];
};

module.exports = { createUser, getUserByEmail, getUserById, updateUser, deleteUser };