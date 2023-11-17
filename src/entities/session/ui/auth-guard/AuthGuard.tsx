import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { useRoleUser } from '../../model/sessionModel';

type AuthGuardProps = {
  isAuth: boolean;
  children: ReactNode;
};

export function AuthGuard(props: AuthGuardProps) {
  const { isAuth, children } = props;
  const { roles, checkUserRole } = useRoleUser();

  if (isAuth && roles) {
    // if (checkUserRole('superAdmin')) return <Navigate to={PATH_PAGE.superAdmin.root} />;
    if (checkUserRole('doctor')) return <Navigate to={PATH_PAGE.doctor.root} />;
    if (checkUserRole('medChief')) return <Navigate to={PATH_PAGE.personnel.root} />;
    if (checkUserRole('superAdmin')) return <Navigate to={PATH_PAGE.patients.records} />;
  }

  return <>{children} </>;
}
