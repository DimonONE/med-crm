import { HomeNavigation } from '~features/home-navigation';
import { PATH_PAGE } from '~shared/lib/react-router';
import { CheckListICO, ClientsICO, ClinicsICO, FinanceICO, OfficesICO, PersonnelICO, RatesICO, ServicesICO, SettingsICO } from '~shared/ui/cards-navigate';


export function PersonnelHomePage() {

  const cards = [
    {
      id: 1,
      title: 'МОЯ КЛИНИКА',
      ico: <ClinicsICO />,
      link: '/',
    },
    {
      id: 2,
      title: 'Тарифы',
      ico: <RatesICO />,
      link: '/',
    },
    {
      id: 3,
      title: 'ФИНАНСЫ',
      ico: <FinanceICO />,
      link: '/',
    },
    {
      id: 4,
      title: 'ПАЦИЕНТЫ',
      ico: <ClientsICO />,
      link: PATH_PAGE.patients.records,
    },
    {
      id: 5,
      title: 'ПЕРСОНАЛ',
      ico: <PersonnelICO />,
      link: PATH_PAGE.personnel.root,
    },
    {
      id: 6,
      title: 'Кабинеты врачей',
      ico: <OfficesICO />,
      link: PATH_PAGE.doctor.root,
    },
    {
      id: 7,
      title: 'ПОСЕЩАЕМОСТЬ',
      ico: <CheckListICO />,
      link: PATH_PAGE.attendance.root,
    },
    {
      id: 8,
      title: 'Услуги',
      ico: <ServicesICO />,
      link: PATH_PAGE.services,
    },
    {
      id: 9,
      title: 'Настройки',
      ico: <SettingsICO />,
      link: '/',
    },
  ];

  return (
    <HomeNavigation
      title='Стоматологическая клиника'
      cards={cards} />
  );
}
