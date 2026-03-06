require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/usersRoutes');
const companyRoutes = require('./routes/companyRoutes');
const onboardingRoutes = require('./routes/onboardingRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

// Routes
app.use('/users', userRoutes);               // Admin accounts + login
app.use('/companies', companyRoutes);        // Companies CRUD
app.use('/onboarding', onboardingRoutes);    // Onboarding status + dashboard
app.use('/messages', messagesRoutes);        // Admin peer messaging

// Health check
app.get('/', (req, res) => {
  res.send('Track It Backend is running!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Track It Backend running on port ${PORT}`);
});