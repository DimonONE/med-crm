import { useMutation } from '@tanstack/react-query';
import axiosInstance from '~shared/api/realworld';
import { Template } from '../types';

export const appointmentTableKeys = {
  root: ['appointment-table'],
  createUpdateBodyBlock: () => [...appointmentTableKeys.root, 'create-update-body-block'],
};

export function useCreateUpdateBodyBlock() {
  return useMutation({
    mutationKey: appointmentTableKeys.createUpdateBodyBlock(),
    mutationFn: async (data: Template[]): Promise<Template[]> => {
      const response = await axiosInstance({
        url: '/template/create-update-body-block',
        method: 'POST',
        data,

      });
      return response.data;
    },
  });
}
