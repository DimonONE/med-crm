import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { UserEntityDto, realworldApi } from '~shared/api/realworld';

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

export const useGetUserId = (userId: string): UseQueryResult<UserEntityDto, unknown> =>
  useQuery({
    queryKey: [sessionKeys.users.getUserId()],
    queryFn: async () => {
      try {
        const response = await realworldApi.users.usersControllerGetUserById(userId);
        return response.data;
      } catch (error) {
        return error;
      }
    }, 
  },
);
