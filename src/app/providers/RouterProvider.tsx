import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { AuthGuard, sessionModel } from '~entities/session';
// import { MainLayout } from '~pages/layouts';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Loadable } from '~shared/ui/loadable';
import { Header, HeaderLogin } from '~widgets/header';

// const ArticlePage = Loadable(lazy(() => import('~pages/article')));
// const EditorPage = Loadable(lazy(() => import('~pages/editor')));
// const HomePage = Loadable(lazy(() => import('~pages/home')));
const AllClinicsPage = Loadable(lazy(() => import('~pages/suter-admin/all-clinics')));
const AddClinicPage = Loadable(lazy(() => import('~pages/suter-admin/add-clinic')));
const EditClinicPage = Loadable(lazy(() => import('~pages/suter-admin/edit-clinic')));
const ClinicApplicationsPage = Loadable(lazy(() => import('~pages/suter-admin/clinic-applications')));
const LoginPage = Loadable(lazy(() => import('~pages/login')));
const Page404 = Loadable(lazy(() => import('~pages/page-404')));
// const ProfilePage = Loadable(lazy(() => import('~pages/profile')));
const RegisterPage = Loadable(lazy(() => import('~pages/register')));
// const SettingsPage = Loadable(lazy(() => import('~pages/settings')));

export function Router() {
  const isAuth = sessionModel.useAuth();

  return useRoutes([
    {
      element: !isAuth ? <Header /> : <HeaderLogin />,
      children: [
        {
          path: 'all-clinic/:id?',
          element: (
            <AuthGuard isAuth={isAuth}>
              <AllClinicsPage />
            </AuthGuard>
          ),
        },
        {
          path: 'clinic-applications',
          element: (
            <AuthGuard isAuth={isAuth}>
              <ClinicApplicationsPage />
            </AuthGuard>
          ),
        },
        {
          path: 'add-clinic',
          element: (
            <AuthGuard isAuth={isAuth}>
              <AddClinicPage />
            </AuthGuard>
          ),
        },
        {
          path: 'edit-clinic',
          element: (
            <AuthGuard isAuth={isAuth}>
              <EditClinicPage />
            </AuthGuard>
          ),
        },
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
            <AuthGuard isAuth={isAuth}>
              <RegisterPage />
            </AuthGuard>
          ),
        },
        // {
        //   path: 'settings',
        //   element: (
        //     <GuestGuard isAuth={isAuth}>
        //       <SettingsPage />
        //     </GuestGuard>
        //   ),
        // },
        // {
        //   path: 'editor',
        //   children: [
        //     {
        //       element: (
        //         <GuestGuard isAuth={isAuth}>
        //           <EditorPage />
        //         </GuestGuard>
        //       ),
        //       index: true,
        //     },
        //     {
        //       path: ':slug',
        //       element: (
        //         <GuestGuard isAuth={isAuth}>
        //           <EditorPage edit />
        //         </GuestGuard>
        //       ),
        //     },
        //   ],
        // },
        // {
        //   path: 'profile',
        //   children: [
        //     {
        //       element: <Navigate to={PATH_PAGE.page404} replace />,
        //       index: true,
        //     },
        //     { path: ':username', element: <ProfilePage /> },
        //     { path: ':username/favorites', element: <ProfilePage favorites /> },
        //   ],
        // },
        // {
        //   path: 'article',
        //   children: [
        //     {
        //       element: <Navigate to={PATH_PAGE.page404} replace />,
        //       index: true,
        //     },
        //     { path: ':slug', element: <ArticlePage /> },
        //   ],
        // },
      ],
    },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to={PATH_PAGE.page404} replace /> },
  ]);
}
