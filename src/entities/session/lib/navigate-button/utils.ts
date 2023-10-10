import { PATH_PAGE, RoleEnum } from '~shared/lib/react-router';

export const getNavigateList = (role: RoleEnum) => {
  switch (role) {
    case RoleEnum.SuperAdmin:
      return [
        { value: PATH_PAGE.superAdmin.root, label: 'Все клиники' },
        { value: PATH_PAGE.superAdmin.clinicApplications, label: 'Заявки' },
      ];

    default:
      return [];
  }
};