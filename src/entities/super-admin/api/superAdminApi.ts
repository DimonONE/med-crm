import { useMutation, useQuery } from '@tanstack/react-query';
import { Api, realworldApi } from '~shared/api/realworld';

type Status = 'approval' | 'pending' | 'notapproval';

export type ListOfUsersQuery = {
   limit: number | null;
   status: 'approval' | 'pending' | 'notapproval';
   offset: number | null;
   sortBy: 'ASC' | 'DESC' | null;
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
  },
};

export function useListOfUsers(query: ListOfUsersQuery) {
  return useQuery({
    queryKey: superAdminKeys.superAdmin.listofusers(),
    queryFn: async () => {
      const params = {
        limit:  null,
        status: 'pending' as Status,
        offset:  null,
        sortBy: null,
        fieldSort:  null,
        category:  null,
        filter:  null,
      };

      console.log('query', query);

      const response = await realworldApi.admin.usersAdminControllerGetListOfAviableUser(params);

      return response;
    },
  });
}

export function useAllTypeClinic() {
  return useQuery({
    queryKey: superAdminKeys.superAdmin.allTypeClinic(),
    queryFn: async () => {

      const response = await realworldApi.admin.usersAdminControllerGetAllTypeClinic();

      return response?.data;
    },
  });
}

export function useCreateClinic() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.createClinic(),
    mutationFn: async (clinic: Api.CreateClinicUserDtoDto) => {
    
      const response = await realworldApi.admin.usersAdminControllerCreateClinic(clinic);

      return response;
    },
  });
}

export function useUpdateClinic() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.updateClinic(),
    mutationFn: async (clinic: Api.UpdateClinicUserDtoDto) => {
    
      const response = await realworldApi.admin.usersAdminControllerUpdateClinic(clinic);

      return response;
    },
  });
}

export function useAddTypeClinic() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.addTypeClinic(),
    mutationFn: async (type: Api.CreateTypeClinicDtoDto) => {
    
      const response = await realworldApi.admin.usersAdminControllerAddTypeClinic(type);

      return response;
    },
  });
}


export function useSwitchStatusClinic() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.switchStatusClinic(),
    mutationFn: async (params: Api.SwitchStatusDtoDto) => {
    
      const response = await realworldApi.admin.usersAdminControllerSwitchStatusClinic(params);

      return response;
    },
  });
}

export function useStatusUser() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.statusUser(),
    mutationFn: async (params: Api.SwitchStatusUserDtoDto) => {
    
      const response = await realworldApi.admin.usersAdminControllerStatusUser(params);

      return response;
    },
  });
}