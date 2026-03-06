const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, readMessage } = require('../controllers/messagesController');
const { adminOnly } = require('../middleware/authMiddleware');

// Admin-only messaging routes
router.post('/', adminOnly, sendMessage);          // Send a message
router.get('/', adminOnly, getMessages);          // Fetch messages for logged-in admin
router.put('/:id/read', adminOnly, readMessage);  // Mark message as read

module.exports = router;