import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getHomeUrl } from '~shared/lib/react-router';
import { useRoleUser } from '../../model/sessionModel';

type AuthGuardProps = {
  isAuth: boolean;
  children: ReactNode;
};

export function AuthGuard(props: AuthGuardProps) {
  const { isAuth, children } = props;
  const { roles, checkUserRole } = useRoleUser();
  const homeUrl = getHomeUrl({ checkUserRole });

  if (isAuth && roles) {
    return <Navigate to={homeUrl} />;
  }

  return <>{children} </>;
}
