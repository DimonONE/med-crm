import { useMutation } from '@tanstack/react-query';
import { sessionApi  } from '~entities/session';
import axiosInstance, {
  Api,
} from '~shared/api/realworld';

export function useCreateClinicRequest() {
  return useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.create(),
    mutationFn: async (clinic: Api.CreateClinicUserDtoDto) => {
      const response = await axiosInstance({ url: '/users/create', method:'POST', data: clinic });
      return response;
    },
  });
}