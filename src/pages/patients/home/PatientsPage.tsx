import { HomeNavigation } from '~features/home-navigation';

export function PatientsPage() {

  const cards = [
    {
      id: 1,
      title: 'Тарифы',
      link: '/',
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
