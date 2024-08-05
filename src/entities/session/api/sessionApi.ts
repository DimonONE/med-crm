import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axiosInstance, { UserEntityDto } from '~shared/api/realworld';

export const sessionKeys = {
  session: {
    root: ['session'],
    roles: () => [...sessionKeys.session.root, 'roles'],
    currentUser: () => [...sessionKeys.session.root, 'currentUser'],
  },

  users: {
    root: ['users'],
    getUserId: () => [...sessionKeys.users.root, 'get-user-id'],
  },

  mutation: {
    login: () => [...sessionKeys.session.root, 'login'],
    create: () => [...sessionKeys.session.root, 'create'],
  },
};

type Options = {
  enabled?: boolean
};

export const useGetUserId = (userId: string, options?: Options | undefined): UseQueryResult<UserEntityDto, unknown> =>
  useQuery({
    queryKey: [sessionKeys.users.getUserId(), userId],
    queryFn: async () => {
      const response = await axiosInstance({ url: `/users/user/${userId}` });
      return response.data;
    }, 
    enabled: options?.enabled,
  },
);
