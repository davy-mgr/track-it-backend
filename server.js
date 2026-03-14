require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);
app.use(express.json());

const userRoutes = require('./routes/usersRoutes');
const companyRoutes = require('./routes/companyRoutes');
const onboardingRoutes = require('./routes/onboardingRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

app.use('/users', userRoutes); 
app.use('/companies', companyRoutes);  
app.use('/onboarding', onboardingRoutes); 
app.use('/messages', messagesRoutes);      

app.get('/', (req, res) => {
  res.send('Track It Backend is running!');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Track It Backend running on port ${PORT}`);
});