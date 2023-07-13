const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tyagisatyamm@gmail.com',
    pass: 'satyam'
  }
});

// Function to send email notification
function sendEmailNotification(email, subject, text) {
  const mailOptions = {
    from: 'tyagisatyamm@gmail.com',
    to: email,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = sendEmailNotification;
