import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Loadable } from '~shared/ui/loadable';
import { useRoleUser } from '../../model/sessionModel';

// SuperAdmin
const AllClinicsPage = Loadable(lazy(() => import('~pages/super-admin/all-clinics')));
const AddClinicPage = Loadable(lazy(() => import('~pages/super-admin/add-clinic')));
const EditClinicPage = Loadable(lazy(() => import('~pages/super-admin/edit-clinic')));
const ClinicApplicationsPage = Loadable(lazy(() => import('~pages/super-admin/clinic-applications')));

export function SuperAdminGuard(): RouteObject {
  const { roles, checkUserRole } = useRoleUser();

  // if (!roles || !checkUserRole('superAdmin')) return {};
  if (!roles || checkUserRole('superAdmin')) return {};

  return {
    path: 'clinic/:id?',
    children: [
      {
        element: <AllClinicsPage />,
        index: true,
      },
      { path: 'applications/:id?', element: <ClinicApplicationsPage /> },
      { path: 'add-clinic', element: <AddClinicPage /> },
      { path: 'edit-clinic', element: <EditClinicPage /> },
    ],
  };
}
