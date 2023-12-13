import {  useMutation } from '@tanstack/react-query';
import axiosInstance, { Api } from '~shared/api/realworld';
import { useListOfInfinity } from '~shared/lib/react-query';

export type QueryListOfUsers = {
  limit: number | null;
  status: UserStatus;
  offset: number | null;
  sortBy: SortByType;
  fieldSort: string | null;
  category: string | null;
  role: string | null;
  filter: string | null;
};

export const personnelKeys = {
  root: ['personnel'],
  listOfPersonnel: () => [...personnelKeys.root, 'list-of-personnel'],
  detail: () => [...personnelKeys.root, 'detail'],
  createPersonnel: () => [...personnelKeys.root, 'create-personnel'],
  updatePersonnel: () => [...personnelKeys.root, 'update-personnel'],
};

export function useCreatePersonal() {
  return useMutation({
    mutationKey: personnelKeys.createPersonnel(),
    mutationFn: async (personnel: Api.CreatePersonalDtoDto) => {
      const response = await axiosInstance({ 
        url: '/admin/create-personal', 
        method: 'POST',
        data: personnel,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  });
}

export function useUpdatePersonnel() {
  return useMutation({
    mutationKey: personnelKeys.updatePersonnel(),
    mutationFn: async (personnel: Api.UpdatePersonalDtoDto) => {
      const response = await axiosInstance({ 
        url: '/admin/update-personal', 
        method: 'POST',
        data: personnel,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  });
}

const fetchListOfPersonnelPage = async (query: QueryListOfUsers) => {
  const response = await axiosInstance({ url: '/admin/all-personal', method: 'GET', params: query });
  return response.data;
};

export function useListOfPersonnelInfinity(initialQuery?: Partial<QueryListOfUsers>) {
  return useListOfInfinity({
    queryKey: personnelKeys.listOfPersonnel(),
    fetchPage: fetchListOfPersonnelPage,
    initialQuery,
  } );
}
