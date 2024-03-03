import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { CardsNavigate, CheckListICO, ClientsICO, FinanceICO, OfficesICO, SettingsICO } from '~shared/ui/cards-navigate';
import s from './styles.module.scss';


export function MedInfoPage() {

  const cards = [
    {
      id: 1,
      title: <>Медицинская карта <br /> 043-У</>,
      ico: <ClientsICO />,
      link: PATH_PAGE.patients.records,
    },
    {
      id: 2,
      title: <>Медицинская карта <br /> 043-1/У</>,
      ico: <OfficesICO />,
      link: PATH_PAGE.doctor.root,
    },
    {
      id: 3,
      title: 'Лист учета дозовых нагрузок',
      ico: <FinanceICO />,
      link: '/',
    },
    {
      id: 4,
      title: 'Гарантийные сроки и сертификат',
      ico: <CheckListICO />,
      link: PATH_PAGE.attendance.root,
    },
    {
      id: 5,
      title: <>Зубная <br /> формула</>,
      ico: <SettingsICO />,
      link: '/',
    },
    {
      id: 6,
      title: <>Таблица <br /> приема</>,
      ico: <SettingsICO />,
      link: '/',
    },
  ];

  return (
    <div className={s.root}>
      <BackButton title='Мед. карта' link={PATH_PAGE.root} />

      <div className='d-flex'>
        <CardsNavigate cards={cards} className={s.cardsNavigate} />
      </div>
    </div>
  );
}
