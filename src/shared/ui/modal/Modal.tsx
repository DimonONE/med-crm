/* eslint-disable react/button-has-type */
import { ReactNode } from 'react';
import CloseICO from '~shared/svg/close-ico.svg';
import s from './styles.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <button className={s.modalCloseButton} onClick={onClose}>
          <CloseICO />
        </button>
        <div className={s.modalContent}>{children}</div>
      </div>
    </div>
  );
}
