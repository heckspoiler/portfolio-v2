import styles from './SendButton.module.css';

type Props = {
  onClick?: () => void;
  type?: 'submit' | 'button';
};

export default function SendButton({ onClick, type }: Props) {
  return (
    <button type={type} className={styles.sendButton} onClick={onClick}>
      SEND
    </button>
  );
}
