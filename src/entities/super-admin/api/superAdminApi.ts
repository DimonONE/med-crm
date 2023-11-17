import { useQuery } from '@tanstack/react-query';
import { realworldApi } from '~shared/api/realworld';


export const superAdminKeys = {
  superAdmin: {
    root: ['super-admin'],
    listofusers: () => [...superAdminKeys.superAdmin.root, 'listofusers'],
  },
};

export function useListOfUsers() {
  return useQuery({
    queryKey: superAdminKeys.superAdmin.listofusers(),
    queryFn: async () => {
      const response = await realworldApi.users.usersControllerGetListOfAviableUser( );

      return response;
    },
  });
}
