export const PATH_PAGE = {
  root: '/',
  login: '/login',
  register: '/register',
  allClinic: '/all-clinic',
  addClinic: '/add-clinic',
  editClinic: '/edit-clinic',
  clinicApplications: '/clinic-applications',
  settings: '/settings',
  doctor: {
    root: '/doctor',
    patient: (patientId: string) => `/doctor/${patientId}`,
    record: (patientId: string | undefined) => `/doctor/${patientId}/record`,
  },
  page404: '/404',
};
