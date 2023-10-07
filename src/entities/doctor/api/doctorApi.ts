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

