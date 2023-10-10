/* eslint-disable react/button-has-type */
import { ReactNode } from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';

interface SidebarProps {
  children: ReactNode;
  className?: string
}

export function Sidebar({ children, className }: SidebarProps) {
  return (
    <div className={classNames(s.sideBar, className)}>
      {children}
    </div>
  );
}
