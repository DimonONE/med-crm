import { ReactNode } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import s from './styles.module.scss';

interface ItemContainerProps {
  link?: string
  children: ReactNode;
  className?: string
}

export function ItemContainer({ children, link, className }: ItemContainerProps) {
  if (link) {
    return (
      <NavLink to={link} className={classNames(s.item, s.link, className)}>
        {children}
      </NavLink>
    );
  }

  return (
    <div className={classNames(s.item, className)}>
      {children}
    </div>
  );
}
