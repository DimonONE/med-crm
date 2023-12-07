import { QueryFunctionContext, useMutation } from '@tanstack/react-query';
import { Api, realworldApi } from '~shared/api/realworld';
import { useListOfInfinity } from '../../lib/hooks';

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
    mutationFn: async (personal: Api.CreatePersonalDtoDto) => {
      const response = await realworldApi.admin.usersAdminControllerCreatePersonal(personal, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });
    
      return response;
    },
  });
}

export function useUpdatePersonnel() {
  return useMutation({
    mutationKey: personnelKeys.updatePersonnel(),
    mutationFn: async (personnel: Api.UpdatePersonalDtoDto) => {
      const image = personnel.image ? new Blob([personnel.image], { type: 'image/png' }) : null ;

      console.log('personnel', personnel);
      // @ts-ignore
      const response = await realworldApi.admin.usersAdminControllerUpdatePersonal({ ...personnel, image });
      return response.data;
    },
  });
}

const fetchListOfPersonnelPage = async (query: QueryListOfUsers) => {
  const response = await realworldApi.admin.usersAdminControllerGetAllPersonal({
    ...query,
  });
  return response.data;
};

export function useListOfPersonnelInfinity(initialQuery?: Partial<QueryListOfUsers>) {
  const defaultQuery: QueryListOfUsers = {
    offset: 0,
    limit: 10,
    status: 'approval',
    sortBy: 'ASC',
    ...initialQuery,
  } as QueryListOfUsers;

  return useListOfInfinity({
    queryKey: personnelKeys.listOfPersonnel(),
    queryFn: ({ pageParam }: QueryFunctionContext) => fetchListOfPersonnelPage({ ...defaultQuery, ...pageParam  }),
    defaultQuery,
  }, initialQuery);
}
