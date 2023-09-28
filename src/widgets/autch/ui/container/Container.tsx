import s from './styles.module.scss';

type Props = {
  children: React.ReactElement
};

export function Container({ children }: Props) {

  return (
    <div className={s.container}>
      {children}
    </div>
  );
}
