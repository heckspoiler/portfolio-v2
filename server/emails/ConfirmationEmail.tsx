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

import { EmailFonts } from './EmailFonts';
import {
  accentBar,
  card,
  footer,
  header,
  heading,
  hr,
  lead,
  main,
} from './theme';

type ConfirmationEmailProps = {
  name: string;
};

/**
 * Generic "message received" confirmation sent to the person who filled in
 * the form. Deliberately contains none of what they wrote, so nothing they
 * typed is ever echoed back to an address they supplied.
 */
export function ConfirmationEmail({ name }: ConfirmationEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <EmailFonts />
      </Head>
      <Preview>Your message to Carlo has arrived</Preview>
      <Body style={main}>
        <Container style={card}>
          <Section style={accentBar} />

          <Section style={header}>
            <Heading style={heading}>Thanks for reaching out!</Heading>
            <Text style={lead}>
              Hi {name}, your message made it safely to my inbox. I read
              everything that comes through the site and will get back to you
              as soon as I can.
            </Text>
            <Text style={note}>
              This is an automatic confirmation, so there's no need to reply
              to it.
            </Text>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            Sent because you ticked “Email me a confirmation” on the contact
            form at carlothedom.digital.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Default export makes the template show up in `npm run email:dev`.
export default function ConfirmationEmailPreview() {
  return <ConfirmationEmail name="Ada" />;
}

/* ---------- styles ---------- */

const note: CSSProperties = {
  margin: '16px 0 24px',
  fontSize: '14px',
  lineHeight: 1.6,
  color: '#555555',
};
