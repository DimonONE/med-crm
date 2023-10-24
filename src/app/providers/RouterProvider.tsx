import { lazy } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Loadable } from '~shared/ui/loadable';
import { Header, HeaderLogin } from '~widgets/header';

// SuperAdmin

const AllClinicsPage = Loadable(lazy(() => import('~pages/super-admin/all-clinics')));
const AddClinicPage = Loadable(lazy(() => import('~pages/super-admin/add-clinic')));
const EditClinicPage = Loadable(lazy(() => import('~pages/super-admin/edit-clinic')));
const ClinicApplicationsPage = Loadable(lazy(() => import('~pages/super-admin/clinic-applications')));

// Doctor

const DoctorPage = Loadable(lazy(() => import('~pages/doctor')));

// Patients

const PatientsHomePage = Loadable(lazy(() => import('~pages/patients/home')));
const PatientsRecordsPage = Loadable(lazy(() => import('~pages/patients/records')));
const PatientsViewingPage = Loadable(lazy(() => import('~pages/patients/viewing-questionnaire')));
const PatientManagementPage = Loadable(lazy(() => import('~pages/patients/employee-management')));
const PatientEditRecord = Loadable(lazy(() => import('~pages/patients/edit-record')));

// Personnel
const PersonnelHomePage = Loadable(lazy(() => import('~pages/personnel/home')));
const PersonnelDetailsPage = Loadable(lazy(() => import('~pages/personnel/details')));
const PersonnelManagementPage = Loadable(lazy(() => import('~pages/personnel/employee-management')));

// Services
const ServicesPage = Loadable(lazy(() => import('~pages/services')));

// Staff Attendance
const AttendancePage = Loadable(lazy(() => import('~pages/staff-attendance/attendance')));
const AttendanceSchedulePage = Loadable(lazy(() => import('~pages/staff-attendance/schedule')));


// Auth

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
            { path: 'viewing', element: <PatientsViewingPage /> },
            { path: 'edit-record?', element: <PatientEditRecord /> },
            { path: 'member/:patientId?', element: <PatientManagementPage /> },
          ],
        },
        {
          path: 'personnel',
          children: [
            {
              element: <PersonnelHomePage />,
              index: true,
            },
            { path: 'details/:userId', element: <PersonnelDetailsPage /> },
            { path: 'member/:personalId?', element: <PersonnelManagementPage /> },
          ],
        },
        {
          path: 'attendance',
          children: [
            {
              element: <AttendancePage />,
              index: true,
            },
            { path: 'schedule/:id', element: <AttendanceSchedulePage /> },
          ],
        },
        { path: 'services', element: <ServicesPage /> },
      ],
    },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to={PATH_PAGE.page404} replace /> },
  ]);
}
