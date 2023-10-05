/* eslint-disable react/button-has-type */
import { ReactNode } from 'react';
import CloseICO from '~shared/svg/close-ico.svg';
import InfoICO from '../../svg/heart-info-ico.svg';
import WarnICO from '../../svg/warn-ico.svg';
import { Button } from '../button';
import s from './styles.module.scss';


interface ModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
  children: ReactNode;
  type: 'info' | 'warn'
}

export function Modal({ isOpen, onSuccess, onClose, type, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <button className={s.modalCloseButton} onClick={onClose}>
          <CloseICO />
        </button>
        {type === 'info' && <InfoICO />}
        {type === 'warn' && <WarnICO />}
        <div className={s.modalContent}>{children}</div>
        {
          type === 'info'
            ? <Button onClick={onSuccess} >Ок</Button>
            :
            <div className='d-flex'>
              <Button className={s.button} onClick={onSuccess} >Да</Button>
              <Button className={s.button} onClick={onClose}>Нет</Button>
            </div>
        }
      </div>
    </div>
  );
}
