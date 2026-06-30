const BASE = import.meta.env.DEV
  ? 'http://localhost:3000'
  : import.meta.env.VITE_SERVER_URL;

export interface ContactPayload {
  name: string;
  email: string;
  select: string;
  message: string;
  checkbox: boolean;
}

/** Ask Charlybot a question; resolves to the assistant's reply text. */
export async function askCharlybot(
  question: string,
  sessionId: string,
): Promise<string> {
  const res = await fetch(`${BASE}/api/ask?q=${encodeURIComponent(question)}&sessionId=${sessionId}`);
  if (!res.ok) throw new Error(`ask failed: ${res.status}`);
  return res.json();
}

/** Submit the contact form. */
export async function sendContactForm(
  payload: ContactPayload,
): Promise<unknown> {
  const res = await fetch(`${BASE}/api/form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`form failed: ${res.status}`);
  return res.json();
}
