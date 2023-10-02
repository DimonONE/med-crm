// import { UserEntityDto } from '~shared/api/realworld';

// export interface User {
//   email: string;
//   token: string;
//   username: string;
//   bio: string;
//   image: string;
// }

// function mapUser(userDto: UserEntityDto): UserEntityDto {
//   return userDto;
// }

export const sessionKeys = {
  session: {
    root: ['session'],
    currentUser: () => [...sessionKeys.session.root, 'currentUser'],
  },

  mutation: {
    login: () => [...sessionKeys.session.root, 'login'],
    create: () => [...sessionKeys.session.root, 'create'],
  },
};

