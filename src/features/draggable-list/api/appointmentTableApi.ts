import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance, { Api } from '~shared/api/realworld';
import { Template } from '../types';


export const appointmentTableKeys = {
  root: ['appointment-table'],
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


// export function useTemplateGetOne() {
//   return useQuery({
//     queryKey: appointmentTableKeys.templateGetOne(),
//     queryFn: async (id: string): Promise<any> => {
//       const response = await axiosInstance({
//         url: `/template/get-one/${id}`,
//         method: 'GET',
//         data: {},
//       });
//       return response.data;
//     },
//   });
// }

export function useTemplateGetOne(id: string) {
  return useQuery({
    queryKey: appointmentTableKeys.templateGetOne(id),
    queryFn: async (): Promise<Api.TemplateEntityDto> => {
      const response = await axiosInstance({ url: `/template/get-one/${id}`, method: 'GET' });
      return response.data;
    },
  });
}