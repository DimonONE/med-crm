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
  const { roles } = useRoleUser();

  if (isAuth && roles) {
    return <Navigate to={PATH_PAGE.root} />;
  }

  return <>{children} </>;
}
