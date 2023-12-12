import { useMutation, useQuery } from '@tanstack/react-query';
import { sessionApi } from '~entities/session';
import axiosInstance, {
  Api,
} from '~shared/api/realworld';

type Options = {
  enabled? : boolean
};

export const useCurrentUser = (options?: Options) =>
  useQuery({
    queryKey: sessionApi.sessionKeys.session.currentUser(),
    queryFn: async () => {
      const response =  await axiosInstance({ url: '/users/currentuser' });
      return response.data;
    },
    enabled: options?.enabled,
  },
);

export const useGetRoles = (options?: Options) =>
  useQuery({
    queryKey: sessionApi.sessionKeys.session.roles(),
    queryFn: async () => {
     const response = await axiosInstance({ url: '/users/roles' });
     return response.data;
    },
    enabled: options?.enabled,
  },
);

export const useLoginUser = () =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.login(),
    mutationFn: (user: Api.LoginUserDtoDto) => axiosInstance({ url: '/users/login', method: 'POST', data: user }),
  });
