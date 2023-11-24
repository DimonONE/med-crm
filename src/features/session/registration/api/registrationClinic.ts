import { useMutation } from '@tanstack/react-query';
import { sessionApi  } from '~entities/session';
import {
  Api,
  realworldApi,
} from '~shared/api/realworld';

export function useCreateClinicRequest() {
  return useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.create(),
    mutationFn: async (clinic: Api.CreateClinicUserDtoDto) => {
      const response = await realworldApi.users.usersControllerMakeProposal(clinic);

      return response;
    },
  });
}