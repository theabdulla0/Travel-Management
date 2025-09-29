const nodemailer = require("nodemailer");

const sendMail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GOOGLE_APP_GMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });
  const mailOptions = {
    from: `"User" <${process.env.GOOGLE_APP_GMAIL}>`,
    to: to,
    subject: subject,
    text: text,
  };
  await transporter.sendMail(mailOptions);
  
};

module.exports = sendMail;