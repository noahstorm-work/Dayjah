export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const { name, email, message, type } = req.body || {};

  if (type === 'contact') {
    if (!name || !email || !message) {
      res.status(400).json({ error: 'All fields are required.' });
      return;
    }
  } else if (type === 'waitlist') {
    if (!email) {
      res.status(400).json({ error: 'Email is required.' });
      return;
    }
  } else {
    res.status(400).json({ error: 'Invalid request type.' });
    return;
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error('SENDGRID_API_KEY not set');
    res.status(500).json({ error: 'Server configuration error.' });
    return;
  }

  const subject = type === 'contact'
    ? `Contact form message from ${name}`
    : 'New waitlist signup';

  const content = type === 'contact'
    ? `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    : `Email: ${email}\n\nSomeone wants to know when the shop opens.`;

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: 'hello@dayjah.co.uk', name: 'Dayjah' }],
          subject,
        }],
        from: { email: 'hello@dayjah.co.uk', name: 'Dayjah' },
        reply_to: { email, name: name || 'Waitlist subscriber' },
        content: [{
          type: 'text/plain',
          value: content,
        }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('SendGrid error:', response.status, err);
      res.status(500).json({ error: 'Failed to send message. Please try again.' });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('SendGrid fetch error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
