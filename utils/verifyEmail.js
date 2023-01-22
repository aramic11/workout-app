const nodemailer = require('nodemailer');
const { User } = require('../models');
require('dotenv').config();

const verifyEmail = async (email, uuid) => {
    try {
        
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'workoutapp.com',
    to: email,
    subject: 'Workout App Email Verification',
    text: 'Welcome to the Workout App! Use this code to verify your email: ' + uuid,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
} catch (e) {
    console.log(error)
}
};

module.exports = verifyEmail;
