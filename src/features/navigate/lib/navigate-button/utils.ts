import { PATH_PAGE } from '~shared/lib/react-router';

export const getNavigateList = (
    checkUserRole: (role: keyof Roles) => boolean,
  ) => {
  switch (true) {
    case checkUserRole('superAdmin'):
      return [
        { value: PATH_PAGE.superAdmin.root, label: 'Все клиники' },
        { value: PATH_PAGE.superAdmin.addClinic, label: 'Добавить' },
        { value: PATH_PAGE.superAdmin.clinicApplications, label: 'Заявки' },
      ];

    case checkUserRole('medChief'):
      return [
      { value: PATH_PAGE.personnel.root, label: 'Персонал' },
      { value: PATH_PAGE.personnel.add, label: 'Добавить' },
      ];

    case checkUserRole('doctor'):
      return [
      { value: PATH_PAGE.patients.records, label: 'Пациенты' },
      { value: PATH_PAGE.patients.viewing, label: 'Пациент' },
      { value: PATH_PAGE.patients.add, label: 'Добавить' },
      { value: PATH_PAGE.patients.edit(''), label: 'Изменить' },
      { value: PATH_PAGE.patients.editRecord, label: 'Запись' },
      ];
   
    default:
      return [];
  }
};