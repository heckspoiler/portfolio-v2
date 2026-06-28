import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import prompt from './prompt.js';
import { sendContactForm, type ContactBody } from './email.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  defaultHeaders: {
    'anthropic-beta': 'prompt-caching-2024-07-31',
  },
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
    console.error('Charliebot error:', error);
    res.status(500).json('Error processing request');
  }
});

app.post('/api/form', async (req: Request, res: Response) => {
  try {
    const { data, error } = await sendContactForm(req.body as ContactBody);
    if (error) {
      console.error('Contact form error:', error);
      return res.status(400).json({ error });
    }
    res.status(200).json({ data });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000);
}

export default app;
