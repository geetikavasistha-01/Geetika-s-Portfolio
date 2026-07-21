import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit to 5 submissions per hour
  message: { message: 'Too many messages sent. Please try again in an hour.' }
});

router.post('/contact', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All contact fields are required.' });
  }

  // Audit line fallback
  console.log(`[Contact Submission] from ${name} (${email}): ${message}`);

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass // Must be 16-character Gmail App Password
        }
      });

      await transporter.sendMail({
        from: `"${name}" <${emailUser}>`,
        replyTo: email,
        to: emailUser,
        subject: `[Portfolio Contact] Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h3>New Portfolio Contact Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      });
      console.log(`[Contact Email Sent] Message successfully sent to ${emailUser}`);
    } catch (err) {
      console.error('[Contact Email Error] Failed to send email via nodemailer:', err);
    }
  } else {
    console.log('[Contact Email Notice] EMAIL_USER or EMAIL_PASS environment variables not set. Logged to console.');
  }

  res.status(200).json({ success: true, message: 'Message received successfully!' });
});

export default router;

