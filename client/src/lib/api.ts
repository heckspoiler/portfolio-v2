// Frontend API client for the Express backend (server/).
// In dev, calls go to /api/* and Vite proxies them to the server (see
// vite.config.ts). In prod, set VITE_API_URL to the deployed API origin.
// The backend itself is modernized in Phase 5 (chatbot → Claude Haiku).

const BASE = import.meta.env.VITE_API_URL ?? ''

export interface ContactPayload {
  name: string
  email: string
  select: string
  message: string
  checkbox: boolean
}

/** Ask Charlybot a question; resolves to the assistant's reply text. */
export async function askCharlybot(question: string): Promise<string> {
  const res = await fetch(`${BASE}/api/ask?q=${encodeURIComponent(question)}`)
  if (!res.ok) throw new Error(`ask failed: ${res.status}`)
  return res.json()
}

/** Submit the contact form. */
export async function sendContactForm(payload: ContactPayload): Promise<unknown> {
  const res = await fetch(`${BASE}/api/form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`form failed: ${res.status}`)
  return res.json()
}
