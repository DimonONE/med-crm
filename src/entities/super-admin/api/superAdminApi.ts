import { QueryFunctionContext, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { Api, realworldApi } from '~shared/api/realworld';

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
      const response = await realworldApi.admin.usersAdminControllerGetListOfAviableUser(sortQuery);
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

// export function useListOfUsersInfinity(query: Partial<ListOfUsersQuery>) {
//   let defaultQuery: ListOfUsersQuery = {
//     limit: 10,
//     status: 'approval',
//     sortBy: 'ASC',
//     offset: 1,
//     ...query,
//   } as ListOfUsersQuery;

//   const { data, refetch, ...props } = useInfiniteQuery({
//     queryKey: [superAdminKeys.superAdmin.listofusers(), defaultQuery ],
//     queryFn: async ({ pageParam }: QueryFunctionContext) => {
//       const response = await realworldApi.admin.usersAdminControllerGetListOfAviableUser({
//         ...defaultQuery,
//         ...pageParam,
//       });
//       return response.data;
//     },
//     getNextPageParam: async (lastPage, pages) => {
//       if (lastPage.length === 0) {
//         return undefined;
//       }
     
//       return { offset: pages.length + 1 };
//     },
//   });

//   const updateQueryParameters = async (newQuery: Partial<ListOfUsersQuery>) => {
//     defaultQuery = { ...defaultQuery, ...newQuery  };
   
//     refetch({
//       queryKey: [superAdminKeys.superAdmin.listofusers(), defaultQuery],
//     });
//   };

//   return { data,  updateQueryParameters, refetch,  ...props };
// }


export function useListOfUsersInfinity(query: Partial<ListOfUsersQuery>) {
  let defaultQuery: ListOfUsersQuery = {
    limit: 10,
    status: 'approval',
    sortBy: 'ASC',
    offset: 1,
    ...query,
  } as ListOfUsersQuery;

  const { data, refetch, ...props } = useInfiniteQuery({
    queryKey: [superAdminKeys.superAdmin.listofusers(), defaultQuery ],
    queryFn: async ({ pageParam }: QueryFunctionContext) => {
      const response = await realworldApi.admin.usersAdminControllerGetListOfAviableUser({
        ...defaultQuery,
        ...pageParam,
      });
      return response.data;
    },
    getNextPageParam: async (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
     
      return { offset: pages.length + 1 };
    },
  });

  const updateQueryParameters = async (newQuery: Partial<ListOfUsersQuery>) => {
    defaultQuery = { ...defaultQuery, ...newQuery  };
   
    refetch({
      queryKey: [superAdminKeys.superAdmin.listofusers(), defaultQuery],
      exact: true,
    });
  };

  return { data,  updateQueryParameters, refetch,  ...props };
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
      return response.data;
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
      return response.data;
    },
  });
}

export function useSwitchStatusUser() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.statusUser(),
    mutationFn: async (params: Api.SwitchStatusUserDtoDto) => {
      const response = await realworldApi.admin.usersAdminControllerStatusUser(params);
      return response;
    },
  });
}

export function useNewPassword() {
  return useMutation({
    mutationKey: superAdminKeys.superAdmin.newPassword(),
    mutationFn: async (params: Api.SetNewPasswordDtoDto) => {
      const response = await realworldApi.admin.usersAdminControllerSetNewPassword(params);
      return response;
    },
  });
}