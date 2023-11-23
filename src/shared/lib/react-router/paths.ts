export const PATH_PAGE = {
  root: '/',
  login: '/login',
  register: '/register',
  superAdmin: {
    root: '/clinic',
    selectClinic: (clinicId: number) => `/clinic/${clinicId}`,
    addClinic: '/clinic/member',
    editClinic: (clinicId: string) => `/clinic/member/${clinicId}`,
    clinicApplications: '/clinic/applications',
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
    add: '/patients/member',
    edit: (patientsId: string) => `/patients/member/${patientsId}`,
  },
  personnel: {
    root: '/personnel',
    details: (personalId: string) => `/personnel/details/${personalId}`,
    add: '/personnel/member',
    edit: (personalId: string) => `/personnel/member/${personalId}`,
  },
  attendance: {
    root: 'attendance',
    schedule: (id: string) => `schedule/${id}`,
  },
  services: '/services',
  page404: '/404',
};
