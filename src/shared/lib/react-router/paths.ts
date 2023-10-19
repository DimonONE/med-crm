export const PATH_PAGE = {
  root: '/',
  login: '/login',
  register: '/register',
  superAdmin: {
    root: '/all-clinic',
    addClinic: '/add-clinic',
    editClinic: '/edit-clinic',
    clinicApplications: '/clinic-applications',
  },
  doctor: {
    root: '/doctor',
    patient: (patientId: string) => `/doctor/${patientId}`,
    record: (patientId: string | undefined) => `/doctor/${patientId}/record`,
  },
  patients: {
    root: '/patients',
    records: '/patients/records',
    editRecord: '/patients/edit-record',
    viewing: '/patients/viewing',
    add: '/personnel/member',
    edit: (personalId: string) => `/personnel/member/${personalId}`,
  },
  personnel: {
    root: '/personnel',
    details: (personalId: string) => `/personnel/details/${personalId}`,
    add: '/personnel/member',
    edit: (personalId: string) => `/personnel/member/${personalId}`,
  },

  page404: '/404',
};
