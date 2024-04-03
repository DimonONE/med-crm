import { useMutation } from '@tanstack/react-query';
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
      const formData = new FormData();

      Object.entries(personnel)
        .filter(([key]) => key !== 'files')
        .forEach(([key, value]) => {
          formData.append(key, value);
        });

      if (Array.isArray(personnel.files)) {
        personnel.files.forEach((file, index) => {
          formData.append('files', file, `file${index}`);
        });
      }

      const response = await axiosInstance({
        url: '/admin/create-personal',
        method: 'POST',
        data: formData,
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
      const formData = new FormData();

      Object.entries(personnel)
        .filter(([key]) => key !== 'newFiles')
        .forEach(([key, value]) => {
          formData.append(key, value);
        });

      if (personnel.newImage) {
        formData.delete('image');
      }

      if (Array.isArray(personnel.newFiles)) {
        personnel.newFiles.forEach((file, index) => {
          formData.append('newFiles', file, `newFiles${index}`);
        });
      }

      const response = await axiosInstance({
        url: '/admin/update-personal',
        method: 'POST',
        data: formData,
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
  return useListOfInfinity<QueryListOfUsers, Api.UserEntityDto>({
    queryKey: personnelKeys.listOfPersonnel(),
    fetchPage: fetchListOfPersonnelPage,
    initialQuery,
  });
}
