import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance, { Api } from '~shared/api/realworld';
import { Template } from '../types';

type TemplateGetAllR = {
  data: Api.TemplateDtoDto[]
  total: number
};

export type TemplateGetAllType = { offset: number, limit: number, category: string };

export const appointmentTableKeys = {
  root: ['appointment-table'],
  templateGetAll: (category: string) => [...appointmentTableKeys.root, `template-get-all-${category}`],
  templateGetOne: (id: string) => [...appointmentTableKeys.root, `template-get-one-${id}`],
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

export function useTemplateGetOne(id: string) {
  return useQuery({
    queryKey: appointmentTableKeys.templateGetOne(id),
    queryFn: async (): Promise<Api.TemplateEntityDto> => {
      const response = await axiosInstance({ url: `/template/get-one/${id}`, method: 'GET' });
      return response.data;
    },
  });
}

export function useTemplateGetAll({ offset, limit, category }: TemplateGetAllType) {
  return useQuery({
    queryKey: appointmentTableKeys.templateGetAll(category),
    queryFn: async (): Promise<TemplateGetAllR> => {
      const response = await axiosInstance({ url: '/template/get-all', method: 'GET', params: { offset, limit, category } });
      return response.data;
    },
  });
}