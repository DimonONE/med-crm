import { PATH_PAGE } from './paths';

type HomeUrl = {
  checkUserRole: (role: keyof Roles) => boolean
};

export const   getHomeUrl = ({ checkUserRole }: HomeUrl)  => {
  const redirectMap: Record<keyof Roles, string> = {
    superAdmin: PATH_PAGE.superAdmin.root,
    doctor: PATH_PAGE.doctor.root,
    medChief: PATH_PAGE.personnel.root,
    patient: PATH_PAGE.patients.records,
  };

  const matchingRole = Object.keys(redirectMap).find((role) =>
    checkUserRole(role as keyof Roles));

  if (matchingRole) {
    return redirectMap[matchingRole as keyof Roles];
  }

  return PATH_PAGE.root;
};
