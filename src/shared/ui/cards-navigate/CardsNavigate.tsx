
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

export type TCardEvent = Pick<TCard, 'id' | 'title' | 'link'>;

type TCardsNavigate = {
  cards: TCard[]
  className?: string
  onClick?: (event: TCardEvent) => void
};

export function CardsNavigate(props: TCardsNavigate) {
  const { cards, onClick, className } = props;

  const handleClick = (event: TCardEvent) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div className={classNames(s.root, className)}>
      {
        cards.map(({ id, title, ico, link, notification }) => (
          <NavLink key={id} to={link} className={classNames(s.card, { [s.disabled]: link === '#' })}
            onClick={() => link !== '#' ? handleClick({ id, link, title }) : undefined}>
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
