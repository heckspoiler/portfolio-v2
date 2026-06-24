import styles from './PhoneOverlay.module.css'

// Shown only on small screens (the desktop experience isn't mobile-optimized).
export function PhoneOverlay() {
  return (
    <section className={styles.overlay}>
      <h1 className={styles.title}>
        Hello and thanks for visiting my portfolio! It seems you're on a mobile
        device. My portfolio is best viewed on larger screens. Some features
        might not display perfectly on mobile. I know it's common to have
        mobile-friendly sites these days, but some content here is optimized for
        bigger displays. I'd recommend using a computer or tablet for the best
        experience. Sorry for any inconvenience, and I appreciate your
        understanding!
      </h1>
    </section>
  )
}
