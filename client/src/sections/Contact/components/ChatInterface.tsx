import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { askCharlybot } from '../../../lib/api';
import { CharlybotLogo } from '../../../components/ui/CharlybotIcon';
import styles from '../Contact.module.css';
import SendButton from './SendButton';

interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
}

const GREETING: ChatMessage = {
  role: 'bot',
  text: "Hello, I'm Charliebot, nice to meet you! You can ask your questions either in English or German (but you're better of with English probably:)). Have fun!",
};

const MAX_CHARS = 250;

function chatPlaceholder(sent: number): string {
  if (sent > 30) return "you're still here? that's awesome!";
  if (sent > 10) return "you seem interested, that's cool!";
  if (sent > 4) return "there's a lot more to know about me!";
  if (sent > 0) return 'keep on asking...';
  return 'want to know more about me? chat with charliebot to find out about me, my hobbies, flaws and the projects that i’ve built';
}

type Props = {
  /** Section-level entrance reveal, drives the button fade-in. */
  loaded: boolean;
};

export default function ChatInterface({ loaded }: Props) {
  // Reveal/close state for the chat panel (ported from mainButtons.js).
  const [chatOpen, setChatOpen] = useState(false);
  const [chatBtnLabel, setChatBtnLabel] = useState('find out more about me!');

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [sentCount, setSentCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef<HTMLElement>(null);
  const sessionId = useRef<string>(crypto.randomUUID());

  // Keep the chat scrolled to the latest message.
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  const openChat = () => {
    setChatBtnLabel('initializing...');
    setTimeout(() => setChatOpen(true), 2000);
  };
  const closeChat = () => {
    setChatOpen(false);
    setChatBtnLabel('resetting...');
    setTimeout(() => setChatBtnLabel('find out more about me!'), 2000);
  };

  const sendChat = async () => {
    const question = input.trim();
    if (!question) return;
    setMessages((m) => [...m, { role: 'user', text: question }]);
    setInput('');
    setSentCount((c) => c + 1);
    setIsTyping(true);
    try {
      const reply = await askCharlybot(question, sessionId.current);
      setIsTyping(false);
      setMessages((m) => [...m, { role: 'bot', text: reply }]);
    } catch {
      setIsTyping(false);
      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          text: "I can't reach my brain right now — try again in a moment!",
        },
      ]);
    }
  };

  const revealed = loaded ? styles.contactVisible : '';

  return (
    <div className={styles.charlybotContainer}>
      <section
        className={`${styles.chatbotContainer} ${
          chatOpen ? styles.panelVisible : ''
        }`}
      >
        <section className={styles.chatbot}>
          <section className={styles.chatbotHeader}>
            <div className={styles.chatbotLogo}>
              <CharlybotLogo width={40} height={40} />
              <h4>Charliebot</h4>
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
                    <CharlybotLogo width={20} height={20} />
                    <div className={styles.botMessage}>
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div key={i} className={styles.userMessageContainer}>
                    <h5>You</h5>
                    <p className={styles.userMessage}>{msg.text}</p>
                  </div>
                ),
              )}
              {isTyping && (
                <div className={styles.botMessageContainer}>
                  <div className={styles.typingIndicator}>
                    <CharlybotLogo width={20} height={20} />
                  </div>
                </div>
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
                      e.preventDefault();
                      sendChat();
                    }
                  }}
                />
              </section>
              <section className={styles.chatbotSendField}>
                <p>
                  {input.length}/{MAX_CHARS}
                </p>
                <SendButton onClick={sendChat} />
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
  );
}
