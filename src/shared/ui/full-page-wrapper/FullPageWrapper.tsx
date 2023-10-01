import { ReactNode } from 'react';
import styles from './styles.module.scss';

type FullPageWrapperProps = {
  children: ReactNode;
};

export function FullPageWrapper(props: FullPageWrapperProps) {
  const { children } = props;

  return <div className={styles.wrapper}>{children}</div>;
}
