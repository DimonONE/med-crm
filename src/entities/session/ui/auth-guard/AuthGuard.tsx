import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { useRoleUser, Roles } from '../../model/sessionModel';

type AuthGuardProps = {
  isAuth: boolean;
  children: ReactNode;
};

export function AuthGuard(props: AuthGuardProps) {
  const { isAuth, children } = props;
  const { roles, checkUserRole } = useRoleUser();

  if (isAuth && roles) {
    const redirectMap: Record<keyof Roles, string> = {
      // superAdmin: PATH_PAGE.superAdmin.root,
      superAdmin: PATH_PAGE.patients.records,
      doctor: PATH_PAGE.doctor.root,
      medChief: PATH_PAGE.personnel.root,
      patient: PATH_PAGE.patients.records,
    };

    const matchingRole = Object.keys(redirectMap).find((role) =>
      checkUserRole(role as keyof Roles));

    if (matchingRole) {
      return <Navigate to={redirectMap[matchingRole as keyof Roles]} />;
    }
  }

  return <>{children} </>;
}
