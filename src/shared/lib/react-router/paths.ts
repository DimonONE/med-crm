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
    addPatient: '/patients/add-patient',
    records: '/patients/records',
    viewing: '/patients/viewing',
  },

  page404: '/404',
};
