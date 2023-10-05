import { PATH_PAGE, RoleEnum } from '~shared/lib/react-router';

export const getNavigateList = (role: RoleEnum) => {
  switch (role) {
    case RoleEnum.SuperAdmin:
      return [
        { value: PATH_PAGE.allClinic, label: 'Все клиники' },
        { value: PATH_PAGE.clinicApplications, label: 'Заявки' },
      ];

    default:
      return [];
  }
};