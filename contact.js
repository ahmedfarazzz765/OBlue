const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Configure your email transporter (use your email service credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // replace with your email
    pass: 'your-email-password'   // replace with your email password or app password
  }
});

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide name, email, and message' });
  }

  const mailOptions = {
    from: email,
    to: 'babarfaraz48@gmail.com', // your receiving email
    subject: `New message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.json({ message: 'Email sent successfully' });
  });
});

module.exports = router;
