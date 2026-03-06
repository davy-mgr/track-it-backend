const db = require('../config/db');

// Create a new message
const createMessage = async ({ sender_id, receiver_id, content }) => {
  const result = await db.query(
    `INSERT INTO messages (sender_id, receiver_id, content, created_at, read_status)
     VALUES ($1, $2, $3, CURRENT_TIMESTAMP, false)
     RETURNING *`,
    [sender_id, receiver_id, content]
  );
  return result.rows[0];
};

// Fetch messages for a user (all conversations)
const fetchMessagesForUser = async (user_id) => {
  const result = await db.query(
    `SELECT m.id, m.sender_id, m.receiver_id, m.content, m.created_at, m.read_status,
            s.username AS sender_username, r.username AS receiver_username
     FROM messages m
     JOIN users s ON s.id = m.sender_id
     JOIN users r ON r.id = m.receiver_id
     WHERE m.sender_id = $1 OR m.receiver_id = $1
     ORDER BY m.created_at ASC`,
    [user_id]
  );
  return result.rows;
};

// Mark message as read
const markAsRead = async (id) => {
  const result = await db.query(
    `UPDATE messages SET read_status = true WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

module.exports = { createMessage, fetchMessagesForUser, markAsRead };