const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  fetchUsers,
  fetchPositions,
  editUser,
  removeUser
} = require('../controllers/usersController');

const { protect, adminOnly } = require('../middleware/authMiddleware');


// Auth routes
router.post('/signup', signup);
router.post('/login', login);


// Admin user management
router.get('/', protect, adminOnly, fetchUsers);
router.get('/positions', protect, adminOnly, fetchPositions);

router.put('/:id', protect, adminOnly, editUser);
router.delete('/:id', protect, adminOnly, removeUser);


module.exports = router;