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
  createVacation: () => [...attendanceKeys.root, 'create-vacation'],
};

const fetchListOfAttendancePage = async (query: QueryListOfAttendance): Promise<Api.ResponseVisitSchemaDto[]> => {
  const response = await axiosInstance({ url: '/users/work-list', method: 'GET', params: query });
  return response.data;
};

export function useListOfAttendanceInfinity(initialQuery?: Partial<QueryListOfAttendance>) {
  return useListOfInfinity<QueryListOfAttendance, Api.ResponseVisitSchemaDto>({
    queryKey: attendanceKeys.listOfAttendance(),
    fetchPage: fetchListOfAttendancePage,
    initialQuery,
  });
}


export function useCreateWorkTime() {
  return useMutation({
    mutationKey: attendanceKeys.createWorkTime(),
    mutationFn: async (data: Api.CreateUpdateWorkTimeDtoDto): Promise<Api.UserWorkTimeEntityDto[]> => {
      const response = await axiosInstance({
        url: '/users/create-work-time',
        method: 'POST',
        data,
      });
      return response.data;
    },
  });
}


export function useCreateVacation() {
  return useMutation({
    mutationKey: attendanceKeys.createVacation(),
    mutationFn: async (data: Api.CreateVacationDtoDto): Promise<Api.UserVacationEntityDto> => {
      const response = await axiosInstance({
        url: '/users/create-vacation',
        method: 'POST',
        data,
      });
      return response.data;
    },
  });
}

export function useCreateAttendanceVisits() {
  return useMutation({
    mutationKey: attendanceKeys.createVisits(),
    mutationFn: async (data: Api.CreateUpdateVisitTimeDtoDto): Promise<Api.UserVisitsEntityDto[]> => {
      const response = await axiosInstance({
        url: '/users/create-visits',
        method: 'POST',
        data,
      });
      return response.data;
    },
  });
}