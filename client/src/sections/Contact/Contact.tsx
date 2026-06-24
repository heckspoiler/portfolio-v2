import { useEffect, useRef, useState } from 'react'
import { askCharlybot, sendContactForm } from '../../lib/api'
import { GithubIcon } from '../../components/ui/GithubIcon'
import { CharlybotIcon, CharlybotLogo } from '../../components/ui/CharlybotIcon'
import styles from './Contact.module.css'

interface ChatMessage {
  role: 'bot' | 'user'
  text: string
}

const GREETING: ChatMessage = {
  role: 'bot',
  text: "Hello, I'm Charlybot, nice to meet you! You can ask your questions either in English or German (but you're better of with English probably:)). Have fun!",
}

const MAX_CHARS = 250

function chatPlaceholder(sent: number): string {
  if (sent > 30) return "you're still here? that's awesome!"
  if (sent > 10) return "you seem interested, that's cool!"
  if (sent > 4) return "there's a lot more to know about me!"
  if (sent > 0) return 'keep on asking...'
  return 'want to know more about me? chat with charlybot to find out about me, my hobbies, flaws and the projects that i’ve built'
}

export function Contact() {
  const [loaded, setLoaded] = useState(false)

  // Reveal/close state for the two panels (ported from mainButtons.js).
  const [chatOpen, setChatOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [chatBtnLabel, setChatBtnLabel] = useState('find out more about me!')
  const [formBtnLabel, setFormBtnLabel] = useState('drop me a line!')

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [input, setInput] = useState('')
  const [sentCount, setSentCount] = useState(0)
  const messagesRef = useRef<HTMLElement>(null)

  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    select: '',
    message: '',
    checkbox: false,
  })

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Keep the chat scrolled to the latest message.
  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const openChat = () => {
    setChatBtnLabel('initializing...')
    setTimeout(() => setChatOpen(true), 2000)
  }
  const closeChat = () => {
    setChatOpen(false)
    setChatBtnLabel('resetting...')
    setTimeout(() => setChatBtnLabel('find out more about me!'), 2000)
  }
  const openForm = () => {
    setFormBtnLabel('sharpening the pencil...')
    setTimeout(() => setFormOpen(true), 2000)
  }
  const closeForm = () => {
    setFormOpen(false)
    setFormBtnLabel('maybe another time!')
    setTimeout(() => setFormBtnLabel('drop me a line!'), 2000)
  }

  const sendChat = async () => {
    const question = input.trim()
    if (!question) return
    setMessages((m) => [...m, { role: 'user', text: question }])
    setInput('')
    setSentCount((c) => c + 1)
    try {
      const reply = await askCharlybot(question)
      setMessages((m) => [...m, { role: 'bot', text: reply }])
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'bot', text: "I can't reach my brain right now — try again in a moment!" },
      ])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await sendContactForm(form)
    } catch {
      /* surfaced once the backend is wired up in Phase 5 */
    }
    setFormOpen(false)
    setFormBtnLabel('licking the stamp...')
    setTimeout(() => setFormBtnLabel('sent!'), 2000)
    setTimeout(() => setFormBtnLabel('thanks for reaching out!'), 4000)
  }

  const revealed = loaded ? styles.contactVisible : ''

  return (
    <section id="contact" data-section-id="contact" className={styles.section}>
      <h2 className={`${styles.title} ${loaded ? styles.titleLoaded : ''}`}>
        Contact
      </h2>

      <section className={styles.container}>
        <section className={styles.mainSection}>
          {/* ---- Charlybot ---- */}
          <div className={styles.charlybotContainer}>
            <section
              className={`${styles.chatbotContainer} ${
                chatOpen ? styles.panelVisible : ''
              }`}
            >
              <section className={styles.chatbot}>
                <section className={styles.chatbotHeader}>
                  <div className={styles.chatbotLogo}>
                    <CharlybotLogo />
                    <h4>Charlybot</h4>
                  </div>
                  <button
                    type="button"
                    className={`${styles.chatbotCross} contact-cross`}
                    onClick={closeChat}
                    aria-label="Close chat"
                  />
                </section>
                <section className={styles.chatbotMainField}>
                  <section className={styles.chatbotMessages} ref={messagesRef}>
                    {messages.map((msg, i) =>
                      msg.role === 'bot' ? (
                        <div key={i} className={styles.botMessageContainer}>
                          <CharlybotIcon />
                          <p className={styles.botMessage}>{msg.text}</p>
                        </div>
                      ) : (
                        <div key={i} className={styles.userMessageContainer}>
                          <h5>You</h5>
                          <p className={styles.userMessage}>{msg.text}</p>
                        </div>
                      ),
                    )}
                  </section>
                  <div className={styles.chatbotInput}>
                    <section className={styles.chatbotInputField}>
                      <textarea
                        maxLength={MAX_CHARS}
                        placeholder={chatPlaceholder(sentCount)}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            sendChat()
                          }
                        }}
                      />
                    </section>
                    <section className={styles.chatbotSendField}>
                      <p>
                        {input.length}/{MAX_CHARS}
                      </p>
                      <button
                        type="button"
                        className={styles.chatbotSendButton}
                        onClick={sendChat}
                      >
                        SEND
                      </button>
                    </section>
                  </div>
                </section>
              </section>
            </section>
            <button
              className={`${styles.mainButton} ${revealed} ${
                chatBtnLabel !== 'find out more about me!' ? styles.buttonResize : ''
              }`}
              onClick={openChat}
            >
              {chatBtnLabel}
            </button>
          </div>

          {/* ---- Contact form ---- */}
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
                  <label htmlFor="checkbox">Send me a copy</label>
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={form.checkbox}
                    onChange={(e) =>
                      setForm({ ...form, checkbox: e.target.checked })
                    }
                  />
                </section>
                <button type="submit">send</button>
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
          <a className={`${styles.footerLink} ${revealed}`}>
            <h3 className={styles.footerH3}>CV</h3>
          </a>
        </footer>
      </section>
    </section>
  )
}
