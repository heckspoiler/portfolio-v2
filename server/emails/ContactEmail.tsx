import type { CSSProperties } from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'react-email';

import type { ContactBody } from '../email';
import { EmailFonts } from './EmailFonts';
import {
  SELECT_LABELS,
  accentBar,
  card,
  clr,
  footer,
  headFont,
  header,
  heading,
  hr,
  lead,
  main,
} from './theme';

type ContactEmailProps = {
  body: ContactBody;
};

/**
 * Internal notification: the full submission, sent only to the site owner.
 * The sender never receives this one; they get ConfirmationEmail instead.
 */
export function ContactEmail({ body }: ContactEmailProps) {
  const { name, email: senderEmail, select, message, checkbox } = body;
  const topic = SELECT_LABELS[select] ?? select;

  return (
    <Html lang="en">
      <Head>
        <EmailFonts />
      </Head>
      <Preview>New message from {name} via carlothedom.digital</Preview>
      <Body style={main}>
        <Container style={card}>
          <Section style={accentBar} />

          <Section style={header}>
            <Heading style={heading}>New message from {name}</Heading>
            <Text style={lead}>
              Someone just reached out through the contact form on
              carlothedom.digital.
            </Text>
          </Section>

          <Section style={details}>
            <Text style={fieldLabel}>From</Text>
            <Text style={fieldValue}>{name}</Text>

            <Text style={fieldLabel}>Email</Text>
            <Text style={fieldValue}>{senderEmail}</Text>

            <Text style={fieldLabel}>Topic</Text>
            <Text style={fieldValue}>{topic}</Text>
          </Section>

          <Section style={messageWrap}>
            <Section style={messageBox}>
              <Text style={messageLabel}>Message</Text>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            Reply to this email to answer {name} directly.
            {checkbox
              ? ' They asked for a confirmation, so a generic “message received” email was sent to them.'
              : ' No confirmation was sent to them.'}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactEmail;

/* ---------- styles specific to the notification ---------- */

const details: CSSProperties = {
  padding: '8px 32px 0',
};

const fieldLabel: CSSProperties = {
  margin: '16px 0 2px',
  fontFamily: headFont,
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: clr.coral,
};

const fieldValue: CSSProperties = {
  margin: 0,
  fontSize: '15px',
  color: clr.black,
};

// Padded wrapper insets the highlight box; a Section is a 100%-width table, so
// the box itself must NOT use horizontal margins (that overflows the card).
const messageWrap: CSSProperties = {
  padding: '8px 32px 24px',
};

const messageBox: CSSProperties = {
  padding: '20px',
  backgroundColor: clr.coralTint,
  borderLeft: `4px solid ${clr.coral}`,
};

const messageLabel: CSSProperties = {
  margin: '0 0 8px',
  fontFamily: headFont,
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: clr.coral,
};

const messageText: CSSProperties = {
  margin: 0,
  fontSize: '15px',
  lineHeight: 1.6,
  color: clr.black,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
};
