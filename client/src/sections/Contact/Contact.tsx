import { GithubIcon } from '../../components/ui/GithubIcon';
import { useInView } from '../../hooks/useInView';
import styles from './Contact.module.css';
import ChatInterface from './components/ChatInterface';
import ContactForm from './components/ContactForm';

export function Contact() {
  // Entrance reveal, triggered when the section scrolls into view.
  const [sectionRef, loaded] = useInView<HTMLElement>({ threshold: 0.8 });

  const revealed = loaded ? styles.contactVisible : '';

  return (
    <section
      id="contact"
      data-section-id="contact"
      className={styles.section}
      ref={sectionRef}
    >
      <h2 className={`${styles.title} ${loaded ? styles.titleLoaded : ''}`}>
        Contact
      </h2>

      <section className={styles.container}>
        <section className={styles.mainSection}>
          <ChatInterface loaded={loaded} />
          <ContactForm loaded={loaded} />
        </section>

        <footer className={styles.footer}>
          <a
            href="https://github.com/heckspoiler"
            target="_blank"
            rel="noreferrer"
            className={`${styles.footerLink} ${revealed}`}
          >
            <GithubIcon className={styles.footerSvg} />
          </a>
          <a
            href="https://www.linkedin.com/in/carlo-ettisberger-1a15a8282/"
            target="_blank"
            rel="noreferrer"
            className={`${styles.footerLink} ${revealed}`}
          >
            <svg
              className={styles.footerSvg}
              width="101"
              height="104"
              viewBox="0 0 101 104"
              fill="#FAF126"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M93.7857 6.5H7.19174C3.22388 6.5 0 9.44531 0 13.0609V90.9391C0 94.5547 3.22388 97.5 7.19174 97.5H93.7857C97.7536 97.5 101 94.5547 101 90.9391V13.0609C101 9.44531 97.7536 6.5 93.7857 6.5ZM30.5254 84.5H15.5558V41.0719H30.548V84.5H30.5254ZM23.0406 35.1406C18.2386 35.1406 14.3609 31.6266 14.3609 27.3203C14.3609 23.0141 18.2386 19.5 23.0406 19.5C27.8201 19.5 31.7203 23.0141 31.7203 27.3203C31.7203 31.6469 27.8426 35.1406 23.0406 35.1406ZM86.6391 84.5H71.6694V63.375C71.6694 58.3375 71.5567 51.8578 63.8915 51.8578C56.0911 51.8578 54.8962 57.3422 54.8962 63.0094V84.5H39.9266V41.0719H54.2875V47.0031H54.4904C56.4969 43.5906 61.3891 39.9953 68.671 39.9953C83.821 39.9953 86.6391 48.9937 86.6391 60.6937V84.5Z" />
            </svg>
          </a>
          <a
            className={`${styles.footerLink} ${revealed}`}
            href="/assets/CV.pdf"
            target="_blank"
          >
            <h3 className={styles.footerH3}>CV</h3>
          </a>
        </footer>
      </section>
    </section>
  );
}
