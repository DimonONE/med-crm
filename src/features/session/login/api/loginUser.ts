import { useMutation } from '@tanstack/react-query';
import { sessionApi } from '~entities/session';
// import { sessionApi } from '~entities/session';
import {
  RequestParams,
  realworldApi,
} from '~shared/api/realworld';



export type LoginUserDto = {
  email: string,
  password: string
};

export const useLoginUser = () =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.login(),
    mutationFn: (user: LoginUserDto) => realworldApi.users.usersControllerLogin( { body: user } as RequestParams ),
  });
