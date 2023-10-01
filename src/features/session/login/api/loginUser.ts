import { UseMutationOptions, useMutation } from '@tanstack/react-query';
// import { sessionApi } from '~entities/session';
import {
  HttpResponse,
  UserEntityDto,
  realworldApi,
} from '~shared/api/realworld';

type UseLoginUserMutation = UseMutationOptions<
  HttpResponse<{ user: UserEntityDto }, unknown>,
  unknown
>;

type UseLoginUserOptions = Omit<
  UseLoginUserMutation,
  'mutationFn' | 'mutationKey'
>;

type LoginUserDto = {
  email: string,
  password: string
};

export const useLoginUser = (oprions?: UseLoginUserOptions) =>
  useMutation({
    // @ts-ignore
    mutationFn: (user: LoginUserDto) => realworldApi.users.usersControllerLogin( user ),
    ...oprions,
  });
