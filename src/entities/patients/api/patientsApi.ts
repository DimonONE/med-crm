import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance, { Api } from '~shared/api/realworld';


type QueryParams = {
  limit?: number | null;
  offset?: number | null;
  sortBy?: 'ASC' | 'DESC' | null;
  filter?: string | null;
};

export interface CreatePatientDto extends Omit<Api.CreatePatientDtoDto, 'sex'> {
  sex: 'man' | 'woman' | ''
}

export const patientsKeys = {
  patients: {
    root: ['patients'],
    create: () => [...patientsKeys.patients.root, 'create'],
    patientId: () => [...patientsKeys.patients.root, 'patient-id'],
  },
};

export function usePatientsList(params: QueryParams) {
  return useQuery({
    queryKey: patientsKeys.patients.root,
    queryFn: async () => {
      const paramsData = {
        limit: params.limit || 1,
        offset: params.offset || 1,
        sortBy: params.sortBy || 'ASC',
        filter: params.filter || null,
      };

      const response = await axiosInstance({ url: '/patients', method: 'GET', params: paramsData }); 

      return response;
    },
  });
}

export function usePatientId(patientId: string) {
  return useQuery({
    queryKey: patientsKeys.patients.patientId(),
    queryFn: async () => {
      const response = await axiosInstance({ url: `/patients/${patientId}`, method: 'GET' }); 
      return response;
    },
  });
}

export function useCreatePatient() {
  return useMutation({
    mutationKey: patientsKeys.patients.create(),
    mutationFn: async (patientInfo: CreatePatientDto) => {
      const response = await axiosInstance({ url: '/patients/create', method: 'POST', data: patientInfo }); 
      return response;
    },
  });
}