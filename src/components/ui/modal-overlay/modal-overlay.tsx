import { FC } from 'react';
import styles from './modal-overlay.module.css';

export const ModalOverlayUI: FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className={styles.overlay} onClick={onClick}></div>
);
