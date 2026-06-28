// Express API for the portfolio: Charlybot chatbot (Claude) + contact form (email).

import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import Anthropic from '@anthropic-ai/sdk';
import prompt from './prompt';

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

interface ContactBody {
  name: string;
  email: string;
  select: string;
  message: string;
  checkbox: boolean;
}

const app = express();
const PORT = process.env.PORT || 3000;
const email = requireEnv('MAIL');
const password = requireEnv('MAIL_PW');

app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  defaultHeaders: {
    'anthropic-beta': 'prompt-caching-2024-07-31',
  },
});

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: { user: email, pass: password },
});

app.get('/api/ask', async (req: Request, res: Response) => {
  const question = req.query.q;
  if (typeof question !== 'string' || !question) {
    return res.status(400).json('Please, write something.');
  }

  try {
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 500,
      system: [
        {
          type: 'text',
          text: prompt,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: question }],
    });

    const answer = message.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('')
      .trim();

    res.json(answer);
  } catch (error) {
    console.error('Charlybot error:', error);
    res.status(500).json('Error processing request');
  }
});

// ----- Contact form: send mail (and optional copy to the sender) -----
app.post('/api/form', async (req: Request, res: Response) => {
  const {
    name,
    email: senderEmail,
    select,
    message,
    checkbox,
  } = req.body as ContactBody;

  const mailOptions = {
    from: email,
    to: email,
    subject: `New message from your portfolio from ${name}`,
    text: `Name: ${name}
           Email: ${senderEmail}
           Subject: ${select}
           Message: ${message}
           Checkbox: ${checkbox}`,
  };

  const mailRedirect = {
    from: email,
    to: senderEmail,
    subject: `Thank you for reaching out!`,
    text: `Hello ${name}, thanks for reaching out!
I've received your email and will get back to you as soon as possible. Enjoy your day!
Best regards, Carlo

Your message:
${message}

Your email:
${senderEmail}`,
    html: `
    <html lang="en">
  <head>
    <style>
      h2 { font-size: 1.1rem; font-weight: bold; }
      h3 { font-size: 0.8rem; font-style: italic; font-weight: bold; }
      p { font-size: 0.9rem; font-weight: regular; }
      .text-below { font-size: 0.7rem; }
      .img { height: 40px; width: 40px; }
    </style>
  </head>
  <body>
    <h2>Hello ${name}, thanks for reaching out!</h2>
    <p>I've received your email and will get back to you as soon as possible. Enjoy your day!</p>
    <p>Best regards, Carlo</p>
    <br />
    <img src="https://i.ibb.co/yBT69K7/carlo-1.png" alt="carlo-1" border="0">
    <br/><br/>
    <h3>Your email:</h3>
    <p class="text-below">${senderEmail}</p>
    <h3>Your message:</h3>
    <p class="text-below">${message}</p>
  </body>
</html>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error, email not sent' });
    }
    console.log('Email sent: ' + info.response);

    if (checkbox === true) {
      transporter.sendMail(mailRedirect, (redirectError, redirectInfo) => {
        if (redirectError) {
          console.error(redirectError);
          return res.status(500).json({ message: 'Error, email not sent' });
        }
        console.log('Copy sent: ' + redirectInfo.response);
        res.json({ message: 'Success, emails sent!' });
      });
    } else {
      res.json({ message: 'Success, email sent!' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
