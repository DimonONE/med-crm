
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import s from './styles.module.scss';
// import ClientsICO from './svg/clients-ico.svg';
// import OfficesICO from './svg/offices-ico.svg';
// import ServicesICO from './svg/services-ico.svg';
// import SettingsICO from './svg/settings-ico.svg';

export type TCard = {
  id: number
  title: string
  link: string
  ico?: ReactElement
  notification?: boolean
};

type TCardsNavigate = {
  cards: TCard[]
};

export function CardsNavigate(props: TCardsNavigate) {
  const { cards } = props;

  return (
    <div className={s.root}>
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
