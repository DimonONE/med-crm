import { RouteObject } from 'react-router-dom';
import { useRoleUser } from '../../model/sessionModel';

export function PersonnelGuard(routes: RouteObject): RouteObject {
  const { checkUserRole } = useRoleUser();

  if (!checkUserRole('medChief')) return {};

  return routes;
}
