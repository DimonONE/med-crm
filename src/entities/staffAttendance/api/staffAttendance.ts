import { useMutation } from '@tanstack/react-query';
import axiosInstance, { Api } from '~shared/api/realworld';
import { useListOfInfinity } from '~shared/lib/react-query';

export type QueryListOfAttendance = {
  doctorName: string | null;
  sortBy: SortByType;
  fieldBySort: string;
  date: string;
};

export const attendanceKeys = {
  root: ['staff-attendance'],
  listOfAttendance: () => [...attendanceKeys.root, 'list-of-attendance'],
  createWorkTime: () => [...attendanceKeys.root, 'create-work-time'],
  createVisits: () => [...attendanceKeys.root, 'create-visits'],
};

const fetchListOfAttendancePage = async (query: QueryListOfAttendance) => {
  const response = await axiosInstance({ url: '/users/work-list', method: 'GET', params: query });
  return response.data;
};

export function useListOfAttendanceInfinity(initialQuery?: Partial<QueryListOfAttendance>) {
  return useListOfInfinity({
    queryKey: attendanceKeys.listOfAttendance(),
    fetchPage: fetchListOfAttendancePage,
    initialQuery,
  });
}


export function useCreateWorkTime() {
  return useMutation({
    mutationKey: attendanceKeys.createWorkTime(),
    mutationFn: async (data: Api.UpdatePersonalDtoDto) => {
      const response = await axiosInstance({
        url: '/users/create-work-time',
        method: 'POST',
        data,
      });
      return response.data;
    },
  });
}

export function useCreateAttendanceVisits() {
  return useMutation({
    mutationKey: attendanceKeys.createWorkTime(),
    mutationFn: async (data: Api.UpdatePersonalDtoDto) => {
      const response = await axiosInstance({
        url: '/users/create-visits',
        method: 'POST',
        data,
      });
      return response.data;
    },
  });
}