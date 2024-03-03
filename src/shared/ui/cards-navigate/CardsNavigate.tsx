
import { ReactElement } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import s from './styles.module.scss';

export type TCard = {
  id: number
  title: string | JSX.Element
  link: string
  ico?: ReactElement
  notification?: boolean
};

type TCardsNavigate = {
  cards: TCard[]
  className?: string
};

export function CardsNavigate(props: TCardsNavigate) {
  const { cards, className } = props;

  return (
    <div className={classNames(s.root, className)}>
      {
        cards.map(({ id, title, ico, link, notification }) => (
          <NavLink key={id} to={link} className={s.card}>
            <div className={s.icon}>
              {ico}
            </div>
            {title}
            {notification && <div className={s.notification} />}
          </NavLink>
        ))
      }
    </div >
  );
}
