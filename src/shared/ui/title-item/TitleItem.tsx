import { ReactNode } from 'react';
import classNames from 'classnames';
import ArrowBottomICO from '~shared/svg/arrow-bottom-filter.svg';
import s from './styles.module.scss';

interface TitleItemProps {
  title: string | number
  onFilter?: () => void;
  children?: ReactNode;
  className?: string
}

export function TitleItem({ title, children, onFilter, className }: TitleItemProps) {
  return (
    <button
      className={classNames(s.titleItem, { [s.filter]: Boolean(onFilter) }, className)}
      type='button'
      onClick={onFilter}
    >
      <span className={s.title}>{title}</span>
      {onFilter && <ArrowBottomICO />}
      {children}
    </button>
  );
}
