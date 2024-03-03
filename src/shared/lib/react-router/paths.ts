export const PATH_PAGE = {
  root: '/',
  login: '/login',
  logout: '/logout',
  register: '/register',
  superAdmin: {
    clinics: '/clinic',
    selectClinic: (clinicId: number) => `/clinic/${clinicId}`,
    addClinic: '/clinic/member',
    editClinic: (clinicId: number) => `/clinic/member/${clinicId}`,
    clinicApplications: '/clinic/applications',
    selectApplications: (clinicId: number) => `/clinic/applications/${clinicId}`,
  },
  doctor: {
    root: '/doctor',
    patient: (patientId: string) => `/doctor/${patientId}`,
    record: (patientId: string | undefined) => `/doctor/${patientId}/record`,
  },
  patients: {
    root: '/patients',
    records: '/patients/records',
    editRecord: (patientsId: string) =>  `/patients/record/${patientsId}`,
    details: (patientsId: string) => `/patients/records/${patientsId}`,
    add: '/patients/member',
    edit: (patientsId: string) => `/patients/member/${patientsId}`,
  },
  personnel: {
    root: 'personnel',
    details: (personalId: string) => `/personnel/details/${personalId}`,
    add: '/personnel/member',
    edit: (personalId: string) => `/personnel/member/${personalId}`,
  },
  attendance: {
    root: 'attendance',
    schedule: (id: string) => `/attendance/schedule/${id}`,
  },
  receptionTable: {
    root: '/reception-table',
    create: '/reception-table/create',
  },
  medInfo: {
    root: '/med-info',
    detail: (id: string) => `/med-info/${id}`,
  },
  services: '/services',
  tariffs: '/tariffs',
  page404: '/404',
};
