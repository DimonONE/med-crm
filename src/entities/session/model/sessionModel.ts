import { setCookie } from 'cookies-next';
import { StateCreator, createStore, useStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserEntityDto } from '~shared/api/realworld';


type RoleUser = {
  role: keyof Roles, 
  roles: Roles
  checkUserRole: (role: keyof Roles) => boolean
};

type SessionState = {
  user: UserEntityDto | null;
  roles: Roles | null
  addUser: (user: UserEntityDto) => void;
  deleteUser: () => void;
  addRoles: (roles: Roles) => void;
};

const createSessionSlice: StateCreator<
  SessionState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  SessionState
> = (set) => ({
  user: null,
  roles: null,
  addUser: (user: UserEntityDto) => {
    set({ user }, false, 'session/addUser');
  },

  addRoles: (roles: Roles) => {
    set({ roles }, false, 'session/roles');
  },

  deleteUser: () => {
    set({ user: null }, false, 'session/deleteUser');
    setCookie('token', null);
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
    },
  ),
);

export const useAuth = () =>
useStore(sessionStore, (state) => !!state.user?.id);


export const useCurrentUser = () =>
useStore(sessionStore, (state) => state.user);

export const addUser = (user: UserEntityDto) => sessionStore.getState().addUser(user);

export const logout = () => sessionStore.getState().deleteUser();

export const saveTokenToStorage = (token: string) => {
  setCookie('token', token);
};

export const useRoleUser = (): RoleUser =>
 useStore(sessionStore, (state) => {
  const userRole = state.user?.role.name as keyof Roles ;
  const checkUserRole = (role: keyof Roles) => state?.roles ? !!(state.user?.role.name === role) : false;

  return { role: userRole, roles: state.roles as Roles, checkUserRole };
});

export const addRoles = (roles: Roles) => sessionStore.getState().addRoles(roles);