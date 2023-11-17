import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Api, realworldApi } from '~shared/api/realworld';

export const patientsKeys = {
  patients: {
    root: ['patients'],
    create: () => [...patientsKeys.patients.root, 'create'],
    patientId: () => [...patientsKeys.patients.root, 'patient-id'],
  },
};

type QueryParams = {
  limit?: number | null;
  offset?: number | null;
  sortBy?: 'ASC' | 'DESC' | null;
  filter?: string | null;
};

export function usePatientsList(params: QueryParams) {
  return useQuery({
    queryKey: patientsKeys.patients.root,
    queryFn: async () => {
      const paramsData = {
        limit: params.limit || 5,
        offset: params.offset || 10,
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
    mutationFn: async (patientInfo: Api.CreatePatientDtoDto) => {
      console.log('patientInfo', patientInfo);
      
      const testData: Api.CreatePatientDtoDto = {
        address: 'address',
        city: 'city',
        country:' country',
        dateOfBirth: dayjs().hour(2).toISOString(),
        email: 'dimonmezey@gmail.com',
        fullName: 'Dima MI Mezii',
        passport: 'passport',
        passportIssuingAuthority:'passportIssuingAuthority',
        phone: '+380974275832',
        sex: 'man',
        tin: 'test',
        // image: 'test',
        notice: 'notice',
      };
 
      const response = await realworldApi.patients.patientsControllerCreatePatient( testData );

      return response;
    },
  });
}