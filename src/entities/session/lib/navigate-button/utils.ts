import { sessionModel } from '~entities/session';
import { PATH_PAGE } from '~shared/lib/react-router';

export const getNavigateList = (
    checkUserRole: (role: keyof sessionModel.Roles) => boolean,
  ) => {
  switch (true) {
    case true:
      return [
        { value: PATH_PAGE.patients.root, label: 'Пациенты' },
        { value: PATH_PAGE.patients.viewing, label: 'Пациент' },
        { value: PATH_PAGE.patients.add, label: 'Добавить' },
        { value: PATH_PAGE.patients.edit(''), label: 'Изменить' },
        { value: PATH_PAGE.patients.records, label: 'Запись' },
        { value: PATH_PAGE.patients.editRecord, label: 'Ред. запись' },
      ];
    case checkUserRole('superAdmin'):
      return [
        { value: PATH_PAGE.superAdmin.root, label: 'Все клиники' },
        { value: PATH_PAGE.superAdmin.clinicApplications, label: 'Заявки' },
      ];

    default:
      return [];
  }
};