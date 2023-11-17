import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Loadable } from '~shared/ui/loadable';
import { useRoleUser, useRoles } from '../../model/sessionModel';

// Patients
const PatientsHomePage = Loadable(lazy(() => import('~pages/patients/home')));
const PatientsRecordsPage = Loadable(lazy(() => import('~pages/patients/records')));
const PatientsViewingPage = Loadable(lazy(() => import('~pages/patients/viewing-questionnaire')));
const PatientManagementPage = Loadable(lazy(() => import('~pages/patients/employee-management')));
const PatientEditRecord = Loadable(lazy(() => import('~pages/patients/edit-record')));

export function PatientsGuard(): RouteObject {
  const roles = useRoles();
  const role = useRoleUser();

  if (!roles) return {};
  if (role !== roles.superAdmin) return {};

  return {
    path: 'patients',
    children: [
      {
        element: <PatientsHomePage />,
        index: true,
      },
      { path: 'records', element: <PatientsRecordsPage /> },
      { path: 'viewing', element: <PatientsViewingPage /> },
      { path: 'edit-record?', element: <PatientEditRecord /> },
      { path: 'member/:patientId?', element: <PatientManagementPage /> },
    ],
  };
}
