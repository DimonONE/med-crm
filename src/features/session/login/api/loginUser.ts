import { useMutation, useQuery } from '@tanstack/react-query';
import { sessionApi } from '~entities/session';
// import { sessionApi } from '~entities/session';
import {
  Api,
  realworldApi,
} from '~shared/api/realworld';


export const useLoginUser = () =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.login(),
    mutationFn: (user: Api.LoginUserDtoDto) => realworldApi.users.usersControllerLogin( user ),
  });

export const useCurrentUser = () =>
  useQuery({
    queryKey: sessionApi.sessionKeys.session.currentUser(),
    queryFn: () => realworldApi.users.usersControllerGetсurentUser(),
  },
);
