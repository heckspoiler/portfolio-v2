import { Font } from 'react-email';
import { FONT_BASE } from './theme';

/* Loads the Nohemi web fonts; used inside <Head> of every email. */
export function EmailFonts() {
  return (
    <>
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
    </>
  );
}

export default EmailFonts;
