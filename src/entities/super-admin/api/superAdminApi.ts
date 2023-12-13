import {  useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import axiosInstance, { Api } from '~shared/api/realworld';
import { useListOfInfinity } from '~shared/lib/react-query';

export type ListOfUsersQuery = {
  limit: number | null;
  status: UserStatus;
  offset: number | null;
  sortBy: SortByType;
  fieldSort: string | null;
  category: string | null;
  filter: string | null;
};


export const superAdminKeys = {
  superAdmin: {
    root: ['super-admin'],
    createClinic: () => [...superAdminKeys.superAdmin.root, 'create-clinic'],
    updateClinic: () => [...superAdminKeys.superAdmin.root, 'update-clinic'],
    addTypeClinic: () => [...superAdminKeys.superAdmin.root, 'add-type-clinic'],
    allTypeClinic: () => [...superAdminKeys.superAdmin.root, 'all-type-clinic'],
    switchStatusClinic: () => [...superAdminKeys.superAdmin.root, 'switch-status-clinic'],
    listofusers: () => [...superAdminKeys.superAdmin.root, 'listofusers'],
    statusUser: () => [...superAdminKeys.superAdmin.root, 'status-user'],
    newPassword: () => [...superAdminKeys.superAdmin.root, 'new-password'],
  },
};

// Out of date version. Use the test useListOfUsersInfinity
export function useListOfUsers(query: Partial<ListOfUsersQuery>) {
  let sortQuery: ListOfUsersQuery = {
    limit: 10,
    status: 'approval',
    sortBy: 'ASC',
    ...query,
  } as ListOfUsersQuery;

  const { data, refetch } = useQuery({
    queryKey: [superAdminKeys.superAdmin.listofusers(), query],
    queryFn: async () => {
      const response = await axiosInstance({ url: '/admin/listofusers', method: 'GET', params: sortQuery }); 

      return response.data;
    },
  });

  const updateQueryParameters = (newQuery: Partial<ListOfUsersQuery>) => {
    sortQuery = { ...sortQuery, ...newQuery };
    refetch({ 
      queryKey: [superAdminKeys.superAdmin.listofusers(), newQuery],
    });
  };

  return { data, updateQueryParameters };
}

// Example usage with different query types
const fetchListOfUsersPage = async (params: ListOfUsersQuery) => {
  const response = await axiosInstance({ url: '/admin/listofusers', method: 'GET', params }); 
  return response.data;
};

export function useListOfUsersInfinity(initialQuery?: Partial<ListOfUsersQuery>) {
  return useListOfInfinity<ListOfUsersQuery>({
    queryKey: superAdminKeys.superAdmin.listofusers(),
    fetchPage: fetchListOfUsersPage,
    initialQuery,
  });
}

export function useAllTypeClinic() {
  return useQuery({
    queryKey: superAdminKeys.superAdmin.allTypeClinic(),
    queryFn: async () => {
      const response: AxiosResponse<Api.TypeClinicEntityDto[]> = await axiosInstance({ 
        url: '/admin/all-type-clinic',
        method: 'GET', 
      }); 
      return response.data;
    },
  });
}

export function useCreateClinic() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.createClinic(),
    mutationFn: async (clinic: Api.CreateClinicUserDtoDto) => {
      const response = await axiosInstance({ url: '/admin/create-clinic', method: 'POST', data: clinic }); 
      return response;
    },
  });
}

export function useUpdateClinic() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.updateClinic(),
    mutationFn: async (clinic: Api.UpdateClinicUserDtoDto) => {
      const response = await axiosInstance({ url: '/admin/update-clinic', method: 'POST', data: clinic }); 
      return response.data;
    },
  });
}

export function useAddTypeClinic() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.addTypeClinic(),
    mutationFn: async (type: Api.CreateTypeClinicDtoDto) => {
      const response = await axiosInstance({ url: '/admin/add-type-clinic', method: 'POST', data: type }); 
      return response;
    },
  });
}

export function useSwitchStatusClinic() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.switchStatusClinic(),
    mutationFn: async (data: Api.SwitchStatusDtoDto) => {
      const response = await axiosInstance({ url: '/admin/switch-status-clinic', method: 'POST', data }); 
      return response.data;
    },
  });
}

export function useSwitchStatusUser() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.statusUser(),
    mutationFn: async (data: Api.SwitchStatusUserDtoDto) => {
      const response = await axiosInstance({ url: '/admin/switch-status-user', method: 'POST', data }); 
      return response;
    },
  });
}

export function useNewPassword() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.newPassword(),
    mutationFn: async (data: Api.SetNewPasswordDtoDto) => {
      const response = await axiosInstance({ url: '/admin/set-new-password', method: 'POST', data }); 
      return response;
    },
  });
}