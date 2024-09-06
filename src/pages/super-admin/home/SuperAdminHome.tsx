import { HomeNavigation } from '~features/home-navigation';
import { PATH_PAGE } from '~shared/lib/react-router';
import { AddClinicICO, ApplicationsICO, ClinicsICO, RatesICO, SettingsICO, TemplateICO } from '~shared/ui/cards-navigate';


export function SuperAdminHome() {

  const cards = [
    {
      id: 1,
      title: 'Тарифы',
      ico: <RatesICO />,
      link: PATH_PAGE.tariffs,
    },
    {
      id: 2,
      title: 'ЗАЯВКИ',
      ico: <ApplicationsICO />,
      link: PATH_PAGE.superAdmin.clinicApplications,
    },
    {
      id: 6,
      title: 'ШАБЛОНЫ',
      ico: <TemplateICO />,
      link: PATH_PAGE.template.root,
    },
    {
      id: 3,
      title: 'Настройки',
      ico: <SettingsICO />,
      link: '/',
    },
    {
      id: 4,
      title: 'Клиники',
      ico: <ClinicsICO />,
      link: PATH_PAGE.superAdmin.clinics,
    },
    {
      id: 5,
      title: 'ДОБАВИТЬ КЛИНИКУ',
      ico: <AddClinicICO />,
      link: PATH_PAGE.superAdmin.addClinic,
    },
  ];

  return (
    <HomeNavigation
      title='Стоматологическая клиника'
      cards={cards} />
  );
}
