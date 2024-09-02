import { PATH_PAGE } from '~shared/lib/react-router';
import { CardsNavigate, ServicesICO } from '~shared/ui/cards-navigate';
import s from './styles.module.scss';

export function Template() {
  const cards = [
    {
      id: 1,
      title: 'Шаблон приема 234',
      ico: <ServicesICO />,
      link: PATH_PAGE.patients.records,
    },
  ];

  return (
    <CardsNavigate className={s.root} cards={cards} />
  );
}