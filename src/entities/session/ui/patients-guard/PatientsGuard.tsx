import { RouteObject } from 'react-router-dom';
import { useRoleUser } from '../../model/sessionModel';

export function PatientsGuard(routes: RouteObject): RouteObject {
  const { checkUserRole } = useRoleUser();

  if (!checkUserRole('doctor')) return {};

  return routes;
}
