import { HomeNavigation } from '~features/home-navigation';
import { PATH_PAGE } from '~shared/lib/react-router';

export function PatientsPage() {

  const cards = [
    {
      id: 1,
      title: 'Тарифы',
      link: PATH_PAGE.tariffs,
    },
    {
      id: 2,
      title: 'ЗАЯВКИ',
      link: '/',
    },
  ];

  return (
    <HomeNavigation
      title='Стоматологическая клиника'
      cards={cards} />
  );
}
