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
    editRecord: (patientsId: string) => `/patients/record/${patientsId}`,
    details: (patientsId: string) => `/patients/records/${patientsId}`,
    add: '/patients/member',
    edit: (patientsId: string) => `/patients/member/${patientsId}`,
    files: (status: 'shared' | 'move') => `/patients/files/${status}`,
  },
  personnel: {
    root: 'personnel',
    details: (personalId: string) => `/personnel/details/${personalId}`,
    add: '/personnel/member',
    edit: (personalId: string) => `/personnel/member/${personalId}`,
  },
  attendance: {
    root: '/attendance',
    schedule: (id: string) => `/attendance/schedule/${id}`,
  },
  template: {
    root: '/template',
    tab: (id: string, patientId?: string, doctorId?: string) => `/template/${id}/${patientId ? `${patientId}/` : ''}${doctorId ? `${doctorId}/` : ''}`,
    preview: (id: string, subTemplateId: string) => `/template/preview/${id}/${subTemplateId}`,
    create: (id?: string, subTemplateId?: string) =>
      `/template/create${id ? `/${id}` : ''}${subTemplateId ? `/${subTemplateId}` : ''}`,
  },
  reception: {
    root: '/reception',
    info: (patientId: string, doctorId: string, id?: string) => `/reception/${patientId}/${doctorId}/${id}`,
    create: (patientId: string, doctorId: string, id: string, treatmentId: string) =>
      `/reception/create/${patientId}/${doctorId}/${id}/${treatmentId}`,
    viewRecord: (patientId: string, treatmentId: string, id: string) => `/reception/view/${patientId}/${treatmentId}/${id}`,
  },
  medInfo: {
    root: '/med-info',
    cards: (patientId: string) => `/med-info/${patientId}`,
    detail: (patientId: string, id: string) => `/med-info/detail/${patientId}/${id}`,
    edit: (patientId: string, id: string) => `/med-info/edit/${patientId}/${id}`,
  },
  services: '/services',
  tariffs: '/tariffs',
  page404: '/404',
};
