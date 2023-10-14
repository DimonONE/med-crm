import { lazy } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Loadable } from '~shared/ui/loadable';
import { Header, HeaderLogin } from '~widgets/header';

const AllClinicsPage = Loadable(lazy(() => import('~pages/super-admin/all-clinics')));
const AddClinicPage = Loadable(lazy(() => import('~pages/super-admin/add-clinic')));
const EditClinicPage = Loadable(lazy(() => import('~pages/super-admin/edit-clinic')));
const ClinicApplicationsPage = Loadable(lazy(() => import('~pages/super-admin/clinic-applications')));

const DoctorPage = Loadable(lazy(() => import('~pages/doctor')));

const PatientsHomePage = Loadable(lazy(() => import('~pages/patients/home')));
const PatientsRecordsPage = Loadable(lazy(() => import('~pages/patients/records')));
const PatientsAddPatientPage = Loadable(lazy(() => import('~pages/patients/add-patient')));
const PatientsViewingPage = Loadable(lazy(() => import('~pages/patients/viewing-questionnaire')));


const LoginPage = Loadable(lazy(() => import('~pages/login')));
const Page404 = Loadable(lazy(() => import('~pages/page-404')));
// const ProfilePage = Loadable(lazy(() => import('~pages/profile')));
const RegisterPage = Loadable(lazy(() => import('~pages/register')));
// const SettingsPage = Loadable(lazy(() => import('~pages/settings')));

export function Router() {
  // const isAuth = sessionModel.useAuth();
  const location = useLocation();
  const isAuth = location.pathname !== PATH_PAGE.register && location.pathname !== PATH_PAGE.login;

  return useRoutes([
    {
      element: isAuth ? <Header /> : <HeaderLogin />,
      children: [
        {
          path: 'all-clinic/:id?',
          element: (
            <AllClinicsPage />
          ),
        },
        {
          path: 'clinic-applications/:id?',
          element: (
            <ClinicApplicationsPage />
          ),
        },
        {
          path: 'add-clinic',
          element: (
            <AddClinicPage />
          ),
        },
        {
          path: 'edit-clinic',
          element: (
            // <AuthGuard isAuth={isAuth}>
            <EditClinicPage />
            // </AuthGuard>
          ),
        },
        {
          path: 'login',
          element: (
            <LoginPage />
          ),
        },
        {
          path: 'register',
          element: (
            <RegisterPage />
          ),
        },
        {
          path: 'doctor',
          children: [
            {
              element: <DoctorPage />,
              index: true,
            },
            { path: ':patientId/record', element: <DoctorPage /> },
            { path: ':patientId', element: <DoctorPage /> },
          ],
        },
        {
          path: 'patients',
          children: [
            {
              element: <PatientsHomePage />,
              index: true,
            },
            { path: 'records', element: <PatientsRecordsPage /> },
            { path: 'add-patient', element: <PatientsAddPatientPage /> },
            { path: 'viewing', element: <PatientsViewingPage /> },

          ],
        },
      ],
    },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to={PATH_PAGE.page404} replace /> },
  ]);
}
