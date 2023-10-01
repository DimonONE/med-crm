/* eslint-disable react/button-has-type */
import { ReactNode } from 'react';
import s from './styles.module.scss';

interface SidebarProps {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className={s.sideBar}>
      {children}
    </div>
  );
}
