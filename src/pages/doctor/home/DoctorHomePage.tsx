import { HomeNavigation } from '~features/home-navigation';
import { PATH_PAGE } from '~shared/lib/react-router';
import { CheckListICO, ClientsICO, FinanceICO, OfficesICO, SettingsICO } from '~shared/ui/cards-navigate';


export function DoctorHomePage() {

  const cards = [
    {
      id: 1,
      title: 'ПАЦИЕНТЫ',
      ico: <ClientsICO />,
      link: PATH_PAGE.patients.records,
    },
    {
      id: 2,
      title: 'Мой журнал',
      ico: <OfficesICO />,
      link: PATH_PAGE.doctor.root,
    },
    {
      id: 3,
      title: 'ФИНАНСЫ',
      ico: <FinanceICO />,
      link: '/',
    },
    {
      id: 4,
      title: 'ПОСЕЩАЕМОСТЬ',
      ico: <CheckListICO />,
      link: PATH_PAGE.attendance.root,
    },
    {
      id: 5,
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
