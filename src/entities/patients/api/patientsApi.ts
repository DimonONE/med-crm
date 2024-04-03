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
  createRecord: () => [...patientsKeys.root, 'create-record'],
  updateRecord: () => [...patientsKeys.root, 'update-record'],
  deleteRecord: () => [...patientsKeys.root, 'delete-record'],
  createUpdateMedInfo: () => [...patientsKeys.root, 'create-update-med-info'],
};


const fetchListOfPatientsPage = async (params: QueryListOfUsers) => {
  const response = await axiosInstance({ url: '/patients', method: 'GET', params });
  return response.data;
};


export function usePatientsListInfinity(initialQuery?: Partial<QueryListOfUsers>) {
  return useListOfInfinity<QueryListOfUsers, Api.PatientEntityDto>({
    queryKey: patientsKeys.listOfPatients(),
    fetchPage: fetchListOfPatientsPage,
    initialQuery,
  });
}

export function usePatientId(patientId: string): UseQueryResult<Api.PatientEntityDto> {
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

// Records

export function useCreateRecord() {
  return useMutation({
    mutationKey: patientsKeys.createRecord(),
    mutationFn: async (data: Api.CreateRecordDtoDto) => {
      const response = await axiosInstance({ url: '/record/create', method: 'POST', data });
      return response.data;
    },
  });
}

export function useUpdateRecord() {
  return useMutation({
    mutationKey: patientsKeys.updateRecord(),
    mutationFn: async (data: Api.UpdateRecordDTODto) => {
      const response = await axiosInstance({ url: '/record/update', method: 'POST', data });
      return response.data;
    },
  });
}

export function useDeleteRecord() {
  return useMutation({
    mutationKey: patientsKeys.deleteRecord(),
    mutationFn: async (id: string) => {
      const response = await axiosInstance({ url: `/record/delete-record/${id}`, method: 'DELETE' });
      return response.data;
    },
  });
}

// Med info

export function useCreateUpdateMedInfo() {
  return useMutation({
    mutationKey: patientsKeys.createUpdateMedInfo(),
    mutationFn: async (data: Api.MedInfoPatientDtoDto) => {
      const response = await axiosInstance({ url: '/patients/create-update-med-info', method: 'POST', data });
      return response.data;
    },
  });
}
