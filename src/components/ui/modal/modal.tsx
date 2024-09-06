import { FC, memo } from 'react';
import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { ModalOverlayUI } from '@ui';

type TModalUIProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div id='modals' className={styles.modal}>
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h3>
          <button
            id='modals'
            aria-label='Закрыть'
            className={styles.button}
            type='button'
            onClick={onClose}
          >
            <CloseIcon type='primary' />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
