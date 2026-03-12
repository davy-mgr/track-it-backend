const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, readMessage } = require('../controllers/messagesController');
const { adminOnly } = require('../middleware/authMiddleware');


router.post('/', adminOnly, sendMessage);          
router.get('/', adminOnly, getMessages);          
router.put('/:id/read', adminOnly, readMessage);  

module.exports = router;