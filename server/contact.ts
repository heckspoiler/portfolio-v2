import type { ContactBody } from './email.js';

/**
 * Spam defence for the contact form.
 *
 * Two signals, both invisible to a real visitor:
 *  - a honeypot field (`website`) that is hidden with CSS on the client. Humans
 *    never see it, so anything in it came from a bot filling in every input.
 *  - a timing check: the client sends the timestamp at which the form was
 *    opened. Submissions that arrive within a couple of seconds of that are
 *    not typed by a person.
 *
 * Trapped submissions get a fake 200 so the bot can't tell it was caught.
 */

export const HONEYPOT_FIELD = 'website';
const MIN_FILL_TIME_MS = 3_000;

const ALLOWED_TOPICS = new Set([
  'joboffer',
  'interviewoffer',
  'jobrejection',
  'workoffer',
]);
const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 5_000;
// Loose on purpose: the browser already enforces type="email"; this only
// rejects things that clearly aren't addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ParsedForm =
  | { kind: 'ok'; body: ContactBody }
  | { kind: 'spam'; reason: string }
  | { kind: 'invalid'; message: string };

export function parseContactSubmission(raw: unknown): ParsedForm {
  if (!raw || typeof raw !== 'object') {
    return { kind: 'invalid', message: 'Malformed body' };
  }
  const input = raw as Record<string, unknown>;

  // --- honeypot ----------------------------------------------------------
  const honey = input[HONEYPOT_FIELD];
  if (typeof honey === 'string' && honey.trim() !== '') {
    return { kind: 'spam', reason: 'honeypot filled' };
  }

  // --- timing ------------------------------------------------------------
  const startedAt = input.startedAt;
  if (typeof startedAt === 'number' && Number.isFinite(startedAt)) {
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_FILL_TIME_MS) {
      return { kind: 'spam', reason: `submitted after ${elapsed}ms` };
    }
  }

  // --- field validation --------------------------------------------------
  const name = str(input.name);
  const email = str(input.email);
  const select = str(input.select);
  const message = str(input.message);
  const checkbox = input.checkbox === true;

  if (!name || name.length > MAX_NAME) {
    return { kind: 'invalid', message: 'Please tell me your name.' };
  }
  if (!email || email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return { kind: 'invalid', message: 'That email address looks off.' };
  }
  if (!ALLOWED_TOPICS.has(select)) {
    return { kind: 'invalid', message: 'Please pick a topic.' };
  }
  if (!message || message.length > MAX_MESSAGE) {
    return { kind: 'invalid', message: 'Please write a message.' };
  }

  return { kind: 'ok', body: { name, email, select, message, checkbox } };
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}
