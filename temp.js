const nodemailer = require('nodemailer');
-

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'workoutapp.com',
    to: 'noahcote10@gmail.com',
    subject: 'Workout App Email Verification',
    text: 'Welcome to the Workout App! Use this code to verify your email: ' + //'UUID goes here',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });

