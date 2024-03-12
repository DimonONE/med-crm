import {  UseQueryResult, useQuery } from '@tanstack/react-query';
import axiosInstance, { Api } from '~shared/api/realworld';

export const doctorKeys = {
  root: ['doctor'],
  doctors: () => [...doctorKeys.root, 'users-doctors'],
  records: () => [...doctorKeys.root, 'all-records'],
  recordsPatient: () => [...doctorKeys.root, 'all-records-patient'],
};

export function useDoctors(): UseQueryResult<Api.UserResponseEntityDto[]>  {
  return useQuery({
    queryKey: doctorKeys.doctors(),
    queryFn: async () => {
      const response = await axiosInstance({ url: '/users/doctors', method: 'GET' }); 
      return response.data;
    },
  });
}

export function useAllRecords(date: string, userId: string): UseQueryResult<Api.RecordEntityDto[]>   {
  return useQuery({
    queryKey: doctorKeys.records(),
    queryFn: async () => {
      const response = await axiosInstance({ url: '/record/get-all-records', params: { date, userId }, method: 'GET' }); 
      return response.data;
    },
  });
}

export function useAllRecordsPatient(patientId: string): UseQueryResult<Api.RecordEntityDto[]>   {
  return useQuery({
    queryKey: [doctorKeys.recordsPatient(), patientId],
    queryFn: async () => {
      const response = await axiosInstance({ url: '/record/get-all-records-patient', params: { patientId  }, method: 'GET' }); 
      return response.data;
    },
  });
}