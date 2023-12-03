/* eslint-disable react/button-has-type */
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';

interface SidebarProps {
  children: ReactNode;
  className?: string
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={classNames(s.sideBar, className)} {...props}>
    {children}
  </div>
));
