const express = require('express');
const router = express.Router();
const { signup, login, getAllUsers, editUser, removeUser } = require('../controllers/usersController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Auth routes
router.post('/signup', signup);  // Create admin
router.post('/login', login);    // Login

// Admin-only user management
router.get('/', protect, adminOnly, getAllUsers);
router.put('/:id', protect, adminOnly, editUser);
router.delete('/:id', protect, adminOnly, removeUser);

module.exports = router;