import { StateCreator, createStore, useStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserEntityDto, realworldApi } from '~shared/api/realworld';

export type Roles = {
  superAdmin: string
  doctor: string 
  medChief: string
  patient : string
};

type RoleUser = {
  role: keyof Roles, 
  roles: Roles
  checkUserRole: (role: keyof Roles) => boolean
};

type SessionState = {
  user: UserEntityDto | null;
  roles: Roles | null
  token: string | null
  addUser: (user: UserEntityDto, token: string) => void;
  deleteUser: () => void;
  addRoles: (roles: Roles) => void;
  addToken: (token: string) => void;
};

const createSessionSlice: StateCreator<
  SessionState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  SessionState
> = (set) => ({
  user: null,
  roles: null,
  token: null,
  addUser: (user: UserEntityDto, token: string) => {
    set({ user }, false, 'session/addUser');
    if (token) realworldApi.setSecurityData(token);
  },

  addRoles: (roles: Roles) => {
    set({ roles }, false, 'session/roles');
  },

  addToken: (token: string) => {
    set({ token }, false, 'session/token');
  },

  deleteUser: () => {
    set({ user: null, token: null }, false, 'session/deleteUser');
    realworldApi.setSecurityData(null);
  },
});

export const sessionStore = createStore<SessionState>()(
  persist(
    devtools(
      (...a) => ({
        ...createSessionSlice(...a),
      }),
      { name: 'Session Store' },
    ),
    {
      name: 'session',
      onRehydrateStorage: () => (state) => {
        if (state?.token) realworldApi.setSecurityData(state.token);
        if (!state?.token) realworldApi.setSecurityData(null);
      },
    },
  ),
);

export const useAuth = () =>
  useStore(sessionStore, (state) => !!state.user?.fullName);

  
export const useCurrentUser = () =>
  useStore(sessionStore, (state) => state.user);
  
export const addUser = (user: UserEntityDto, token: string) => sessionStore.getState().addUser(user, token);

export const deleteToken = () => sessionStore.getState().deleteUser();

export const saveTokenToStorage = (token: string) => {
  sessionStore.getState().addToken(token);
  realworldApi.setSecurityData(token);
};

export const useRoleUser = (): RoleUser =>
 useStore(sessionStore, (state) => {
  const userRole = state.user?.role.name as keyof Roles ;
  const checkUserRole = (role: keyof Roles) => state?.roles ? !!(state.user?.role.name === role) : false;

  return { role: userRole, roles: state.roles as Roles, checkUserRole };
});

export const addRoles = (roles: Roles) => sessionStore.getState().addRoles(roles);