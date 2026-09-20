import type { CSSProperties } from 'react';

/* Shared palette, fonts and layout styles for all contact-form emails. */

export const clr = {
  black: '#212121',
  white: '#ffffff',
  yellow: '#faf126',
  coral: '#f46265',
  coralTint: '#fdecec',
  muted: '#8a8a8a',
  hairline: '#ededed',
} as const;

export const FONT_BASE = 'https://carlothedom.digital/assets/fonts/nohemi';
export const bodyFont = "'Nohemi Regular', Arial, Helvetica, sans-serif";
export const headFont = "'Nohemi Semibold', Arial, Helvetica, sans-serif";

export const SELECT_LABELS: Record<string, string> = {
  joboffer: 'Job offer',
  interviewoffer: 'Interview invitation',
  jobrejection: 'Job rejection',
  workoffer: 'Website project',
};

export const main: CSSProperties = {
  backgroundColor: clr.yellow,
  fontFamily: bodyFont,
  padding: '32px 8px',
  margin: 0,
};

export const card: CSSProperties = {
  backgroundColor: clr.white,
  maxWidth: '600px',
  margin: '0 auto',
  border: `2px solid ${clr.black}`,
  overflow: 'hidden',
};

export const accentBar: CSSProperties = {
  height: '8px',
  backgroundColor: clr.coral,
};

export const header: CSSProperties = {
  padding: '32px 32px 8px',
};

export const heading: CSSProperties = {
  margin: 0,
  fontFamily: headFont,
  fontSize: '26px',
  fontWeight: 600,
  color: clr.black,
};

export const lead: CSSProperties = {
  margin: '12px 0 0',
  fontSize: '15px',
  lineHeight: 1.6,
  color: '#555555',
};

export const hr: CSSProperties = {
  borderColor: clr.hairline,
  margin: '0 32px',
};

export const footer: CSSProperties = {
  padding: '16px 32px 32px',
  fontSize: '12px',
  textAlign: 'center',
  color: clr.muted,
};
