import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { useRoleUser, useRoles } from '../../model/sessionModel';

type AuthGuardProps = {
  isAuth: boolean;
  children: ReactNode;
};

export function AuthGuard(props: AuthGuardProps) {
  const { isAuth, children } = props;
  const roles = useRoles();
  const role = useRoleUser();

  if (isAuth && roles) {
    if (roles.superAdmin === role) return <Navigate to={PATH_PAGE.superAdmin.root} />;
    if (roles.doctor === role) return <Navigate to={PATH_PAGE.doctor.root} />;
    if (roles.medChief === role) return <Navigate to={PATH_PAGE.personnel.root} />;
    if (roles.patient === role) return <Navigate to={PATH_PAGE.patients.root} />;
  }

  return <>{children} </>;
}
