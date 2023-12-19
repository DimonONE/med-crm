import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance, { Api } from '~shared/api/realworld';
import { useListOfInfinity } from '~shared/lib/react-query';


export type QueryListOfUsers = {
  limit?: number | null;
  offset?: number | null;
  sortBy?: 'ASC' | 'DESC' | null;
  filter?: string | null;
  role: string | null;
};

export const patientsKeys = {
  root: ['patients'],
  listOfPatients: () => [...patientsKeys.root, 'list-of-patients'],
  create: () => [...patientsKeys.root, 'create'],
  patientId: () => [...patientsKeys.root, 'patient-id'],
};


const fetchListOfPatientsPage = async (params: QueryListOfUsers) => {
  const response = await axiosInstance({ url: '/patients', method: 'GET', params }); 
  return response.data;
};


export function usePatientsListInfinity(initialQuery?: Partial<QueryListOfUsers>) {
  return  useListOfInfinity({
    queryKey: patientsKeys.listOfPatients(),
    fetchPage: fetchListOfPatientsPage,
    initialQuery,
  });
}

export function usePatientId(patientId: string): UseQueryResult<Api.PatientEntityDto>  {
  return useQuery({
    queryKey: [patientsKeys.patientId(), patientId],
    queryFn: async () => {
      const response = await axiosInstance({ url: `/patients/${patientId}`, method: 'GET' }); 
      return response.data;
    },
  });
}

export function useCreatePatient() {
  return useMutation({
    mutationKey: patientsKeys.create(),
    mutationFn: async (patientInfo: Api.CreatePatientDtoDto) => {
      const formData = new FormData();

      Object.entries(patientInfo)
      .filter(([key]) => key !== 'files')
      .forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (Array.isArray(patientInfo.files)) {
        patientInfo.files.forEach((file, index) => {
          formData.append('files', file, `file${index}`);
        });
      }

      const response = await axiosInstance({ 
        url: '/patients/create', 
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }); 
      return response;
    },
  });
}