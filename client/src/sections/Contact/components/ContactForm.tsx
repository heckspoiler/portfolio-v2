import { useState } from 'react';
import { sendContactForm, type ContactPayload } from '../../../lib/api';
import styles from '../Contact.module.css';
import SendButton from './SendButton';

type Props = {
  loaded: boolean;
};

const emptyForm: ContactPayload = {
  name: '',
  email: '',
  select: '',
  message: '',
  checkbox: false,
  website: '',
  startedAt: 0,
};

export default function ContactForm({ loaded }: Props) {
  const [formOpen, setFormOpen] = useState(false);
  const [formBtnLabel, setFormBtnLabel] = useState('drop me a line!');

  const [form, setForm] = useState(emptyForm);

  const openForm = () => {
    setFormBtnLabel('sharpening the pencil...');
    setTimeout(() => {
      // Stamp the moment the form becomes usable; the server rejects
      // submissions that arrive implausibly fast after this.
      setForm((f) => ({ ...f, startedAt: Date.now() }));
      setFormOpen(true);
    }, 2000);
  };
  const closeForm = () => {
    setFormOpen(false);
    setFormBtnLabel('maybe another time!');
    setTimeout(() => setFormBtnLabel('drop me a line!'), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendContactForm(form);
    } catch {
      // Keep the form open so they can retry, and tell them it failed.
      setFormBtnLabel('something went wrong — try again!');
      setTimeout(() => setFormBtnLabel('drop me a line!'), 4000);
      return;
    }
    setFormOpen(false);
    setFormBtnLabel('licking the stamp...');
    setTimeout(() => setFormBtnLabel('sent!'), 2000);
    setTimeout(() => {
      setFormBtnLabel('thanks for reaching out!');
    }, 4000);
    setTimeout(() => setFormBtnLabel('drop me a line!'), 6000);
    setForm(emptyForm);
  };

  const revealed = loaded ? styles.contactVisible : '';

  return (
    <div className={styles.formContainer}>
      <form
        className={`${styles.form} ${formOpen ? styles.panelVisible : ''}`}
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className={`${styles.formCross} contact-cross`}
          onClick={closeForm}
          aria-label="Close form"
        >
          <div />
        </button>
        <h3>Get in touch with me!</h3>
        <section className={styles.formOptions}>
          <input
            type="text"
            placeholder="name"
            aria-label="Your name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="email"
            aria-label="Your email address"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            required
            aria-label="Reason for reaching out"
            value={form.select}
            onChange={(e) => setForm({ ...form, select: e.target.value })}
          >
            <option value="" disabled>
              choose one
            </option>
            <option value="joboffer">come work for us!</option>
            <option value="interviewoffer">
              we would like to invite you for an interview!
            </option>
            <option value="jobrejection">
              unfortunately, we're looking for someone else...
            </option>
            <option value="workoffer">build me a website please!</option>
          </select>
          <textarea
            placeholder="type here!"
            aria-label="Your message"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </section>
        {/*
          Honeypot: visually hidden and removed from the tab order and the
          accessibility tree, so only a bot auto-filling every input will
          ever put something in it. The server silently drops those.
        */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            type="text"
            id="contact-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>
        <section className={styles.checkboxSend}>
          <section>
            <input
              type="checkbox"
              id="checkbox"
              checked={form.checkbox}
              onChange={(e) => setForm({ ...form, checkbox: e.target.checked })}
            />{' '}
            <label htmlFor="checkbox">Email me a confirmation</label>
          </section>
          <SendButton type="submit" />
        </section>
      </form>
      <button
        className={`${styles.mainButton} ${revealed} ${
          formBtnLabel !== 'drop me a line!' ? styles.buttonResize : ''
        }`}
        onClick={openForm}
      >
        {formBtnLabel}
      </button>
    </div>
  );
}
