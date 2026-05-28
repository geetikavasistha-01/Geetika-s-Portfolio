const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Geetika Portfolio API is running' });
});

// Future contact route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  // TODO: Add nodemailer or db integration here
  console.log('Contact form submission:', { name, email, message });
  res.status(200).json({ success: true, message: 'Message received successfully!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
