import { useMutation, useQuery } from '@tanstack/react-query';
import { sessionApi, sessionModel } from '~entities/session';
import {
  Api,
  HttpResponse,
  realworldApi,
} from '~shared/api/realworld';


export const useCurrentUser = () =>
  useQuery({
    queryKey: sessionApi.sessionKeys.session.currentUser(),
    queryFn: () => realworldApi.users.usersControllerGetсurentUser(),
  },
);

export const useGetRoles = () =>
  useQuery({
    queryKey: sessionApi.sessionKeys.session.roles(),
    queryFn: () => realworldApi.users.usersControllerGetRoles() as Promise<HttpResponse<void, sessionModel.Roles>>,
  },
);

export const useLoginUser = () =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.login(),
    mutationFn: (user: Api.LoginUserDtoDto) => realworldApi.users.usersControllerLogin( user ),
  });
