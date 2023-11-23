import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Loadable } from '~shared/ui/loadable';
import { useRoleUser } from '../../model/sessionModel';

// SuperAdmin
const AllClinicsPage = Loadable(lazy(() => import('~pages/super-admin/all-clinics')));
const EmployeeManagementPage = Loadable(lazy(() => import('~pages/super-admin/clinic-management')));
const ClinicApplicationsPage = Loadable(lazy(() => import('~pages/super-admin/clinic-applications')));

export function SuperAdminGuard(): RouteObject {
  const { roles, checkUserRole } = useRoleUser();

  if (!roles || !checkUserRole('superAdmin')) return {};

  return {
    path: 'clinic/:clinicId?',
    children: [
      {
        element: <AllClinicsPage />,
        index: true,
      },
      { path: 'applications/:id?', element: <ClinicApplicationsPage /> },
      { path: 'member', element: <EmployeeManagementPage /> },
      { path: 'member/:clinicId?', element: <EmployeeManagementPage /> },
    ],
  };
}
