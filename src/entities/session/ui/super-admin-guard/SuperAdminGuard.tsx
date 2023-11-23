import { RouteObject } from 'react-router-dom';
import { useRoleUser } from '../../model/sessionModel';

export function SuperAdminGuard(routes: RouteObject): RouteObject {
  const { roles, checkUserRole } = useRoleUser();

  if (!roles || !checkUserRole('superAdmin')) return {};

  return routes;
}
