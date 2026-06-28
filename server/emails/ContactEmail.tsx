import type { CSSProperties } from 'react';
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'react-email';

import { ContactBody } from '../email';

type ContactEmailProps = {
  body: ContactBody;
};

const clr = {
  black: '#212121',
  white: '#ffffff',
  yellow: '#faf126',
  coral: '#f46265',
  coralTint: '#fdecec',
  muted: '#8a8a8a',
  hairline: '#ededed',
} as const;

const FONT_BASE = 'https://carlothedom.digital/assets/fonts/nohemi';
const bodyFont = "'Nohemi Regular', Arial, Helvetica, sans-serif";
const headFont = "'Nohemi Semibold', Arial, Helvetica, sans-serif";

const SELECT_LABELS: Record<string, string> = {
  joboffer: 'Job offer',
  interviewoffer: 'Interview invitation',
  jobrejection: 'Job rejection',
  workoffer: 'Website project',
};

export function ContactEmail({ body }: ContactEmailProps) {
  const { name, email: senderEmail, select, message, checkbox } = body;
  const topic = SELECT_LABELS[select] ?? select;

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Nohemi Regular"
          fallbackFontFamily="Arial"
          webFont={{
            url: `${FONT_BASE}/Nohemi-Regular.woff2`,
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Nohemi Semibold"
          fallbackFontFamily="Arial"
          webFont={{
            url: `${FONT_BASE}/Nohemi-SemiBold.woff2`,
            format: 'woff2',
          }}
          fontWeight={600}
          fontStyle="normal"
        />
      </Head>
      <Preview>New message from {name} via carlothedom.digital</Preview>
      <Body style={main}>
        <Container style={card}>
          <Section style={accentBar} />

          <Section style={header}>
            <Heading style={heading}>Thanks for reaching out!</Heading>
            <Text style={lead}>
              Hi {name}, thanks for your message — here's a copy of what came
              through the contact form.
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
              <Text style={messageLabel}>Your message</Text>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            {checkbox
              ? 'You ticked “Send me a copy”, so this confirmation was sent to you too.'
              : 'Sent from the contact form at carlothedom.digital'}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactEmail;

/* ---------- styles ---------- */

const main: CSSProperties = {
  backgroundColor: clr.yellow,
  fontFamily: bodyFont,
  padding: '32px 8px',
  margin: 0,
};

const card: CSSProperties = {
  backgroundColor: clr.white,
  maxWidth: '600px',
  margin: '0 auto',
  border: `2px solid ${clr.black}`,
  overflow: 'hidden',
};

const accentBar: CSSProperties = {
  height: '8px',
  backgroundColor: clr.coral,
};

const header: CSSProperties = {
  padding: '32px 32px 8px',
};

const heading: CSSProperties = {
  margin: 0,
  fontFamily: headFont,
  fontSize: '26px',
  fontWeight: 600,
  color: clr.black,
};

const lead: CSSProperties = {
  margin: '12px 0 0',
  fontSize: '15px',
  lineHeight: 1.6,
  color: '#555555',
};

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

const hr: CSSProperties = {
  borderColor: clr.hairline,
  margin: '0 32px',
};

const footer: CSSProperties = {
  padding: '16px 32px 32px',
  fontSize: '12px',
  textAlign: 'center',
  color: clr.muted,
};
