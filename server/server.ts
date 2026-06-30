import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import prompt from './prompt.js';
import { sendContactForm, type ContactBody } from './email.js';
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types.js';

dotenv.config();

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

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
  const sessionId = req.query.sessionId as string;

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

    const { data: existing } = await supabase
      .from('chat_conversations')
      .select('messages')
      .eq('id', sessionId)
      .maybeSingle();

    const previousMessages = existing?.messages ?? [];
    const updatedMessages = [
      ...previousMessages,
      { role: 'user', content: question },
      { role: 'assistant', content: answer },
    ];

    const { error: upsertError } = await supabase
      .from('chat_conversations')
      .upsert({
        id: sessionId,
        messages: updatedMessages,
        created_at: new Date().toISOString(),
      });

    if (upsertError) console.error('upsert error:', upsertError);
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on :${port}`));
