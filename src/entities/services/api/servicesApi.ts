import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance, { Api } from '~shared/api/realworld';

export const servicesKeys = {
  root: ['services'],
  listOfServices: () => [...servicesKeys.root, 'services'],
  createServicePrice: () => [...servicesKeys.root, 'create-service-price'],
  deleteServicePrice: () => [...servicesKeys.root, 'delete-service-price'],
};

export function useListOfServices() {
  return useQuery({
    queryKey: servicesKeys.listOfServices(),
    queryFn: async (): Promise<Api.ServicePriceEntityDto[]> => {
      const response = await axiosInstance({ url: '/record/get-all-service-prices', method: 'GET' }); 
      return response.data;
    },
  });
}

export function useCreateServices() {
  return useMutation({
    mutationKey: servicesKeys.createServicePrice(),
    mutationFn: async ({ price, name }: Api.CreateServicePriceDtoDto): Promise<Api.ServicePriceEntityDto> => {
      const response = await axiosInstance({ 
        url: '/record/create-service-price',
        method: 'POST',  
        data: { price, name },
        
      }); 
      return response.data;
    },
  });
}

export function useDeleteServices() {
  return useMutation({
    mutationKey: servicesKeys.deleteServicePrice(),
    mutationFn: async ( id: number ) => {
      const response = await axiosInstance({ 
        url: `/record/delete-service-price/${id}`,
        method: 'DELETE',
      }); 
      return response.data;
    },
  });
}