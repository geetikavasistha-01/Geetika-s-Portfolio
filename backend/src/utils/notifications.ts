import axios from 'axios';

export async function sendDiscordNotification(question: string, askedBy: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log('[Discord Notification Notice] DISCORD_WEBHOOK_URL not set. Skipping Discord notification.');
    return;
  }

  try {
    await axios.post(webhookUrl, {
      embeds: [
        {
          title: "❓ New AMA Question Submitted",
          color: 0x88bda4, // Sage green hex
          fields: [
            { name: "Asked By", value: askedBy || "ANONYMOUS", inline: true },
            { name: "Question", value: question }
          ],
          timestamp: new Date().toISOString()
        }
      ]
    });
    console.log('[Discord Notification Sent] Success');
  } catch (error: any) {
    console.error('[Discord Notification Error] Failed to send to webhook:', error.message || error);
  }
}

export async function sendTelegramNotification(question: string, askedBy: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    console.log('[Telegram Notification Notice] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set. Skipping Telegram notification.');
    return;
  }

  try {
    const text = `❓ *New AMA Question Received*\n\n*Asked By:* ${askedBy || 'ANONYMOUS'}\n*Question:* ${question}`;
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown'
    });
    console.log('[Telegram Notification Sent] Success');
  } catch (error: any) {
    console.error('[Telegram Notification Error] Failed to send message:', error.message || error);
  }
}
