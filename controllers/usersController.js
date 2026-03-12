const {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserPositions,
  updateUser,
  deleteUser
} = require('../models/usersModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user)
      return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


const fetchUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


const fetchPositions = async (req, res) => {
  try {
    const positions = await getUserPositions();
    res.json(positions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


const editUser = async (req, res) => {
  try {

    const user = await updateUser(req.params.id, req.body);

    if (!user)
      return res.status(404).json({ error: 'User not found' });

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


const removeUser = async (req, res) => {
  try {

    const user = await deleteUser(req.params.id);

    if (!user)
      return res.status(404).json({ error: 'User not found' });

    res.json({
      message: 'User deleted',
      user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
  signup,
  login,
  fetchUsers,
  fetchPositions,
  editUser,
  removeUser
};