import { Resend } from 'resend';
import ContactEmail from './emails/ContactEmail.js';
import { ConfirmationEmail } from './emails/ConfirmationEmail.js';

export interface ContactBody {
  name: string;
  email: string;
  select: string;
  message: string;
  checkbox: boolean;
}

const FROM = 'Carlo <ciao@carlothedom.digital>';
const OWNER = 'ciao@carlothedom.digital';

/**
 * Sends the full submission to the site owner and, if requested, a generic
 * "message received" confirmation to the sender. The sender's copy never
 * includes the message body, so the form can't be abused to relay arbitrary
 * text to a third-party address.
 */
export async function sendContactForm(body: ContactBody) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const notification = await resend.emails.send({
    from: FROM,
    to: [OWNER],
    replyTo: body.email,
    subject: `New message from ${body.name} via carlothedom.digital`,
    react: ContactEmail({ body }),
  });

  // If the owner's copy failed, surface that; a confirmation without a
  // delivered message would be misleading.
  if (notification.error) return notification;

  if (body.checkbox) {
    const confirmation = await resend.emails.send({
      from: FROM,
      to: [body.email],
      subject: 'Thanks for reaching out!',
      react: ConfirmationEmail({ name: body.name }),
    });
    if (confirmation.error) {
      // The message still reached the owner, so don't fail the request.
      console.error('Confirmation email error:', confirmation.error);
    }
  }

  return notification;
}
