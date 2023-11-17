export const sessionKeys = {
  session: {
    root: ['session'],
    roles: () => [...sessionKeys.session.root, 'roles'],
    currentUser: () => [...sessionKeys.session.root, 'currentUser'],
  },

  mutation: {
    login: () => [...sessionKeys.session.root, 'login'],
    create: () => [...sessionKeys.session.root, 'create'],
  },
};

