import { Resend } from 'resend';
import ContactEmail from './emails/ContactEmail';

export interface ContactBody {
  name: string;
  email: string;
  select: string;
  message: string;
  checkbox: boolean;
}

export async function sendContactForm(body: ContactBody) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const to = ['ciao@carlothedom.digital'];
  if (body.checkbox) to.push(body.email);

  return resend.emails.send({
    from: 'Carlo <ciao@carlothedom.digital>',
    to,
    subject: 'Thanks for reaching out!',
    react: ContactEmail({ body }),
  });
}
