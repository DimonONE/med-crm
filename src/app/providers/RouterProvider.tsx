import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { AuthGuard, DoctorGuard, PersonnelGuard, SuperAdminGuard, sessionModel } from '~entities/session';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Loadable } from '~shared/ui/loadable';
import { Header, HeaderLogin } from '~widgets/header';

// SuperAdmin
const SuperAdminHomePage = Loadable(lazy(() => import('~pages/super-admin/home')));
const AllClinicsPage = Loadable(lazy(() => import('~pages/super-admin/all-clinics')));
const EmployeeManagementPage = Loadable(lazy(() => import('~pages/super-admin/clinic-management')));
const ClinicApplicationPage = Loadable(lazy(() => import('~pages/super-admin/clinic-applications')));

// Doctor
const DoctorHomePage = Loadable(lazy(() => import('~pages/doctor/home')));
const DoctorPage = Loadable(lazy(() => import('~pages/doctor/medical-journal')));

// Personnel
const PersonnelHomePage = Loadable(lazy(() => import('~pages/personnel/home')));
const PersonnelListPage = Loadable(lazy(() => import('~pages/personnel/personnel-list-page')));
const PersonnelDetailsPage = Loadable(lazy(() => import('~pages/personnel/details')));
const PersonnelManagementPage = Loadable(lazy(() => import('~pages/personnel/employee-management')));

// Patients
// const PatientsHomePage = Loadable(lazy(() => import('~pages/patients/home')));
const PatientsRecordsPage = Loadable(lazy(() => import('~pages/patients/records')));
const PatientManagementPage = Loadable(lazy(() => import('~pages/patients/employee-management')));
const PatientEditRecord = Loadable(lazy(() => import('~pages/patients/record-patient')));
const PatientFilesPage = Loadable(lazy(() => import('~pages/patients/files')));

// Reception Table
const ReceptionTablePage = Loadable(lazy(() => import('~pages/reception-table/details')));
const CreatingReceptionPage = Loadable(lazy(() => import('~pages/reception-table/creating-reception')));


// Services
const ServicesPage = Loadable(lazy(() => import('~pages/services')));

// Tariffs
const TariffsPage = Loadable(lazy(() => import('~pages/tariffs')));

// Staff Attendance
const AttendancePage = Loadable(lazy(() => import('~pages/staff-attendance/attendance')));
const AttendanceSchedulePage = Loadable(lazy(() => import('~pages/staff-attendance/schedule')));

// Med Info
const MedInfoPage = Loadable(lazy(() => import('~pages/medical-information/med-info')));
const MedInfoDetailPage = Loadable(lazy(() => import('~pages/medical-information/med-info-detail')));


// Auth
const LoginPage = Loadable(lazy(() => import('~pages/login')));
const LogoutPage = Loadable(lazy(() => import('~pages/logout')));
const Page404 = Loadable(lazy(() => import('~pages/page-404')));
// const ProfilePage = Loadable(lazy(() => import('~pages/profile')));
const RegisterPage = Loadable(lazy(() => import('~pages/registration')));
// const SettingsPage = Loadable(lazy(() => import('~pages/settings')));


export function Router() {
  const isAuth = sessionModel.useAuth();

  const superAdmin = SuperAdminGuard(
    {
      path: PATH_PAGE.root,
      children: [
        {
          element: <SuperAdminHomePage />,
          index: true,
        },
        { path: 'clinic/member', element: <EmployeeManagementPage /> },
        { path: 'clinic/member/:clinicId?', element: <EmployeeManagementPage /> },
        { path: 'clinic/applications/:clinicId?', element: <ClinicApplicationPage /> },
        { path: 'clinic/:clinicId?', element: <AllClinicsPage /> },
      ],
    },
  );

  const doctor = DoctorGuard({
    path: PATH_PAGE.root,
    children: [
      {
        element: <DoctorHomePage />,
        index: true,
      },
      { path: 'patients/records/:patientId?', element: <PatientsRecordsPage /> },
      { path: 'patients/record/:patientId', element: <PatientEditRecord /> },
      { path: 'patients/member/:patientId?', element: <PatientManagementPage /> },
      { path: 'patients/files/:status', element: <PatientFilesPage /> },
    ],
  });
  const personnel = PersonnelGuard({
    path: PATH_PAGE.root,
    children: [
      {
        element: <PersonnelHomePage />,
        index: true,
      },
      { path: 'personnel', element: <PersonnelListPage /> },
      { path: 'personnel/details/:personnelId', element: <PersonnelDetailsPage /> },
      { path: 'personnel/member/:personnelId?', element: <PersonnelManagementPage /> },
      { path: 'patients/member/:patientId?', element: <PatientManagementPage /> },
      { path: 'patients/record/:patientId', element: <PatientEditRecord /> },
      { path: 'patients/records/:patientId?', element: <PatientsRecordsPage /> },
      { path: 'patients/files/:status', element: <PatientFilesPage /> },
    ],
  });
  return useRoutes([
    {
      element: isAuth ? <Header /> : <HeaderLogin />,
      children: [
        superAdmin,
        doctor,
        personnel,
        {
          path: PATH_PAGE.doctor.root,
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
          path: 'reception-table',
          children: [
            {
              element: <ReceptionTablePage />,
              index: true,
            },
            { path: 'create', element: <CreatingReceptionPage /> },
          ],
        },
        {
          path: 'attendance',
          children: [
            {
              element: <AttendancePage />,
              index: true,
            },
            { path: 'schedule/:userId', element: <AttendanceSchedulePage /> },
          ],
        },
        {
          path: PATH_PAGE.medInfo.root,
          children: [
            { path: 'edit/:patientId/:id', element: <MedInfoDetailPage isUpdate /> },
            { path: 'detail/:patientId/:id', element: <MedInfoDetailPage /> },
            { path: ':patientId/:id?', element: <MedInfoPage /> },
          ],
        },
        { path: 'services', element: <ServicesPage /> },
        { path: 'tariffs', element: <TariffsPage /> },
        {
          path: 'login',
          element: (
            <AuthGuard isAuth={isAuth}>
              <LoginPage />
            </AuthGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <RegisterPage />
          ),
        },
      ],
    },
    { path: '/logout', element: <LogoutPage /> },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to={!isAuth ? PATH_PAGE.login : PATH_PAGE.page404} replace /> },
  ]);
}
