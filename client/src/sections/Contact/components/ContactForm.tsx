import { useState } from 'react';
import { sendContactForm } from '../../../lib/api';
import styles from '../Contact.module.css';
import SendButton from './SendButton';

type Props = {
  loaded: boolean;
};

export default function ContactForm({ loaded }: Props) {
  const [formOpen, setFormOpen] = useState(false);
  const [formBtnLabel, setFormBtnLabel] = useState('drop me a line!');

  const [form, setForm] = useState({
    name: '',
    email: '',
    select: '',
    message: '',
    checkbox: false,
  });

  const openForm = () => {
    setFormBtnLabel('sharpening the pencil...');
    setTimeout(() => setFormOpen(true), 2000);
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
    setForm({
      name: '',
      email: '',
      select: '',
      message: '',
      checkbox: false,
    });
  };

  const revealed = loaded ? styles.contactVisible : '';

  return (
    <div className={styles.formContainer}>
      <form
        className={`${styles.form} ${formOpen ? styles.panelVisible : ''}`}
        onSubmit={handleSubmit}
      >
        <div
          className={`${styles.formCross} contact-cross`}
          onClick={closeForm}
        >
          <div />
        </div>
        <h3>Get in touch with me!</h3>
        <section className={styles.formOptions}>
          <input
            type="text"
            placeholder="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            required
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
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </section>
        <section className={styles.checkboxSend}>
          <section>
            <input
              type="checkbox"
              id="checkbox"
              checked={form.checkbox}
              onChange={(e) => setForm({ ...form, checkbox: e.target.checked })}
            />{' '}
            <label htmlFor="checkbox">Send me a copy</label>
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
