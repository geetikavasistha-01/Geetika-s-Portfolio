import { Router } from 'express';
import { AMAEntry } from '../models/AMAEntry';
import { protect } from '../middleware/auth';
import rateLimit from 'express-rate-limit';
import { sendDiscordNotification, sendTelegramNotification } from '../utils/notifications';
import { getTransporter } from '../utils/mailer';

const router = Router();

// Rate limit question submissions to 3 per hour per IP
const askLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: { message: 'Too many questions submitted from this IP. Please try again in an hour.' }
});

// GET answered AMA entries, pinned first
router.get('/ama', async (req, res) => {
  const { pinned } = req.query;
  const filter: any = { answered: true };
  if (pinned === 'true') {
    filter.pinned = true;
  }
  try {
    const entries = await AMAEntry.find(filter)
      .sort({ pinned: -1, date: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving AMA entries' });
  }
});

// POST submit a question (public, rate-limited)
router.post('/ama/ask', askLimiter, async (req, res) => {
  const { question, askedBy } = req.body;
  if (!question || question.length < 10) {
    return res.status(400).json({ message: 'Question must be at least 10 characters long.' });
  }
  try {
    const entry = await AMAEntry.create({
      question,
      askedBy: askedBy || 'ANONYMOUS',
      answered: false
    });

    // Fire notifications asynchronously (best-effort/non-blocking)
    sendDiscordNotification(question, askedBy || 'ANONYMOUS');
    sendTelegramNotification(question, askedBy || 'ANONYMOUS');

    const transporter = getTransporter();
    const emailUser = process.env.EMAIL_USER;
    if (transporter && emailUser) {
      transporter.sendMail({
        from: `"Portfolio AMA" <${emailUser}>`,
        to: emailUser,
        subject: `[Portfolio AMA] New Question from ${askedBy || 'ANONYMOUS'}`,
        text: `A new question has been submitted to your AMA queue:\n\nAsked By: ${askedBy || 'ANONYMOUS'}\nQuestion: ${question}`,
        html: `
          <h3>New AMA Question Received</h3>
          <p><strong>Asked By:</strong> ${askedBy || 'ANONYMOUS'}</p>
          <p><strong>Question:</strong> ${question}</p>
        `
      }).then(() => {
        console.log('[AMA Email Sent] Notification email successfully sent.');
      }).catch(err => {
        console.error('[AMA Email Error] Failed to send notification email:', err);
      });
    }

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting question' });
  }
});

// Admin GET unanswered questions
router.get('/admin/ama/queue', protect, async (req, res) => {
  try {
    const entries = await AMAEntry.find({ answered: false }).sort({ date: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving questions queue' });
  }
});

// Admin Answer a question
router.post('/admin/ama/:id/answer', protect, async (req, res) => {
  const { answer, pinned } = req.body;
  if (!answer) {
    return res.status(400).json({ message: 'Answer content is required.' });
  }
  try {
    const entry = await AMAEntry.findByIdAndUpdate(
      req.params.id,
      { answer, answered: true, pinned: !!pinned, date: Date.now() },
      { new: true }
    );
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error answering question' });
  }
});

// Admin Delete a question
router.delete('/admin/ama/:id', protect, async (req, res) => {
  try {
    await AMAEntry.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question entry' });
  }
});

export default router;
