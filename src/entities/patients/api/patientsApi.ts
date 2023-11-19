import { useMutation, useQuery } from '@tanstack/react-query';
import { Api, realworldApi } from '~shared/api/realworld';


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

      const response = await realworldApi.patients.patientsControllerGetPatients( paramsData );

      return response;
    },
  });
}

export function usePatientId(patientId: string) {
  return useQuery({
    queryKey: patientsKeys.patients.patientId(),
    queryFn: async () => {

      const response = await realworldApi.patients.patientsControllerGetPatientById( patientId );

      return response;
    },
  });
}

export function useCreatePatient() {
  return useMutation({
    mutationKey: patientsKeys.patients.create(),
    mutationFn: async (patientInfo: CreatePatientDto) => {
      console.log('patientInfo', patientInfo);
      
 
      const response = await realworldApi.patients.patientsControllerCreatePatient( patientInfo as Api.CreatePatientDtoDto );

      return response;
    },
  });
}