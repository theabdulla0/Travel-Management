const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_APP_GMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

// Generic mail sender

const sendMail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"Travel App" <${process.env.GOOGLE_APP_GMAIL}>`,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
};

//  * Send OTP email for reset password

const sendOtpMail = async (to, otp) => {
  const subject = "Password Reset OTP - Travel App";
  const text = `Your OTP for resetting your password is: ${otp}. This OTP will expire in 10 minutes.`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Password Reset Request</h2>
      <p>We received a request to reset your password. Use the OTP below to continue:</p>
      <h3 style="color: #2d6cdf; letter-spacing: 2px;">${otp}</h3>
      <p>This OTP will expire in <b>10 minutes</b>. If you didn’t request this, you can safely ignore this email.</p>
      <br/>
      <p>Best regards,<br/>Travel App Team</p>
    </div>
  `;

  return sendMail({ to, subject, text, html });
};

//  Send OTP email for new user verification

const sendVerificationMail = async (to, otp) => {
  const subject = "Verify Your Account - Travel App";
  const text = `Welcome! Your OTP for verifying your account is: ${otp}. This OTP will expire in 10 minutes.`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Welcome to Travel App 🎉</h2>
      <p>Thanks for signing up! Use the OTP below to verify your email address and activate your account:</p>
      <h3 style="color: #16a34a; letter-spacing: 2px;">${otp}</h3>
      <p>This OTP will expire in <b>10 minutes</b>. If you didn’t create this account, you can ignore this email.</p>
      <br/>
      <p>Best regards,<br/>Travel App Team</p>
    </div>
  `;

  return sendMail({ to, subject, text, html });
};

module.exports = { sendMail, sendOtpMail, sendVerificationMail };
