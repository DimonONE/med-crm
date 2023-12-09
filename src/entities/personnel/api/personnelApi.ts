import {  useMutation } from '@tanstack/react-query';
import { API_URL, Api, realworldApi } from '~shared/api/realworld';
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
      const formData = new FormData();

      Object.entries(personal).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      await realworldApi.admin.usersAdminControllerCreatePersonal(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

        const response = await fetch(`${API_URL}/admin/create-personal`, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        });
        console.log('response2', response);
        
        return response;
    },
  });
}

export function useUpdatePersonnel() {
  return useMutation({
    mutationKey: personnelKeys.updatePersonnel(),
    mutationFn: async (personnel: Api.UpdatePersonalDtoDto) => {
      const response = await realworldApi.admin.usersAdminControllerUpdatePersonal(personnel);
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

  return useListOfInfinity({
    queryKey: personnelKeys.listOfPersonnel(),
    fetchPage: fetchListOfPersonnelPage,
    initialQuery,
  } );
}
