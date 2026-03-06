const { createMessage, fetchMessagesForUser, markAsRead } = require('../models/messagesModel');

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const { receiver_id, content } = req.body;
    const sender_id = req.user.id; // from auth middleware
    const message = await createMessage({ sender_id, receiver_id, content });
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all messages for logged-in user
const getMessages = async (req, res) => {
  try {
    const user_id = req.user.id;
    const messages = await fetchMessagesForUser(user_id);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark a message as read
const readMessage = async (req, res) => {
  try {
    const message = await markAsRead(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { sendMessage, getMessages, readMessage };