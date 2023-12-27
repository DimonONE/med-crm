import { ReactElement } from 'react';
import LogoBlue from '~shared/svg/logo-blue.svg';
import { CardsNavigate, TCard } from '~shared/ui/cards-navigate';
import { Sidebar } from '~shared/ui/sidebar';
import s from './styles.module.scss';

type THomeNavigation = {
  logo?: ReactElement
  title: string
  cards: TCard[]
};

export function HomeNavigation(props: THomeNavigation) {
  const { logo, title, cards } = props;

  return (
    <div className={s.root}>
      <Sidebar className={s.sidebar}>
        <div className={s.sidebarContent}>
          <div className={s.logo}>
            {logo ?? <LogoBlue />}
          </div>
          <div className={s.label}>
            {title}
          </div>
        </div>
      </Sidebar>

      <CardsNavigate cards={cards} />
    </div>
  );
}
