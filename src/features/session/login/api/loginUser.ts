import { useMutation, useQuery } from '@tanstack/react-query';
import { sessionApi } from '~entities/session';
import {
  Api,
  HttpResponse,
  realworldApi,
} from '~shared/api/realworld';

type Options = {
  enabled? : boolean
};

export const useCurrentUser = (options?: Options) =>
  useQuery({
    queryKey: sessionApi.sessionKeys.session.currentUser(),
    queryFn: () => realworldApi.users.usersControllerGetсurentUser(),
    enabled: options?.enabled,
  },
);

export const useGetRoles = (options?: Options) =>
  useQuery({
    queryKey: sessionApi.sessionKeys.session.roles(),
    queryFn: () => realworldApi.users.usersControllerGetRoles() as Promise<HttpResponse<void, Roles>>,
    enabled: options?.enabled,
  },
);

export const useLoginUser = () =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.login(),
    mutationFn: (user: Api.LoginUserDtoDto) => realworldApi.users.usersControllerLogin( user ),
  });
