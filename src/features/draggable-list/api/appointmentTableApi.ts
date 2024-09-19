import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance, { Api } from '~shared/api/realworld';
import { Template } from '../types';

type TemplateGetAllR = {
  data: Api.TemplateDtoDto[]
  total: number
};

type CreateTemplate = {
  id: number,
  category: string,
  name: string,
  techInfo: string
};

type CreateSubTemplate = {
  name: string,
  templateId: number,
};

export type TemplateGetAllType = { offset: number, limit: number, category: string };

export const appointmentTableKeys = {
  root: ['appointment-table'],
  templateGetAll: (category: string) => [...appointmentTableKeys.root, `template-get-all-${category}`],
  deleteTemplate: () => [...appointmentTableKeys.root, 'template-delete-template'],
  deleteSubTemplate: () => [...appointmentTableKeys.root, 'template-delete-sub-template'],
  templateGetOne: (id: string) => [...appointmentTableKeys.root, `template-get-one-${id}`],
  createUpdateBodyBlock: () => [...appointmentTableKeys.root, 'create-update-body-block'],
  createTemplate: () => [...appointmentTableKeys.root, 'create-template'],
  createSubTemplate: () => [...appointmentTableKeys.root, 'create-sub-template'],
};

export function useCreateUpdateBodyBlock() {
  return useMutation({
    mutationKey: appointmentTableKeys.createUpdateBodyBlock(),
    mutationFn: async (data: Template): Promise<Template[]> => {
      const response = await axiosInstance({
        url: '/template/create-update-body-block',
        method: 'POST',
        data,

      });
      return response.data;
    },
  });
}

export function useCreateTemplate() {
  return useMutation({
    mutationKey: appointmentTableKeys.createTemplate(),
    mutationFn: async (data: CreateTemplate) => {
      const response = await axiosInstance({
        url: '/template/create-template',
        method: 'POST',
        data,

      });
      return response.data;
    },
  });
}

export function useCreateSubTemplate() {
  return useMutation({
    mutationKey: appointmentTableKeys.createSubTemplate(),
    mutationFn: async (data: CreateSubTemplate) => {
      const response = await axiosInstance({
        url: '/template/create-sub-template',
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

export function useDeleteTemplate() {
  return useMutation({
    mutationKey: appointmentTableKeys.deleteTemplate(),
    mutationFn: async (id: number) => {
      const response = await axiosInstance({
        url: `/template/delete-template/${id}`,
        method: 'DELETE',
      });
      return response.data;
    },
  });
}

export function useDeleteSubTemplate() {
  return useMutation({
    mutationKey: appointmentTableKeys.deleteSubTemplate(),
    mutationFn: async (id: number) => {
      const response = await axiosInstance({
        url: `/template/delete-sub-template/${id}`,
        method: 'DELETE',
      });
      return response.data;
    },
  });
}