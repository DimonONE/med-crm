import { setCookie } from 'cookies-next';
import { StateCreator, createStore, useStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { realworldApi } from '~shared/api/realworld';

export type User = {
  createdAt: string; // Дата і час створення користувача
  createdBy: string; // ID користувача, який створив
  email: string; // Email користувача
  firstName: string; // Ім'я користувача
  id: string; // Унікальний ID користувача
  image: string | null; // Шлях до зображення або null, якщо зображення відсутнє
  lastName: string; // Прізвище користувача
  phone: string; // Номер телефону користувача
  specialization: string | null; // Спеціалізація користувача або null, якщо вона відсутня
  status: 'approval'; // Статус користувача, завжди "approval" в даному випадку
  surname: string; // По батькові користувача
  updatedAt: string; // Дата і час останнього оновлення користувача
  token: string;
};

type SessionState = {
  user: User | null;
  addUser: (user: User) => void;
  deleteUser: () => void;
};

const createSessionSlice: StateCreator<
  SessionState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  SessionState
> = (set) => ({
  user: null,

  addUser: (user: User) => {
    set({ user }, false, 'session/addUser');
    realworldApi.setSecurityData(user.token);
  },

  deleteUser: () => {
    set({ user: null }, false, 'session/deleteUser');
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
        console.log('state', state);
        
        if (state?.user) {
          const { user } = state;
          if (user) realworldApi.setSecurityData(user.token);
          if (!user) realworldApi.setSecurityData(null);
        }
      },
    },
  ),
);

export const useAuth = () =>
  useStore(sessionStore, (state) => !!state.user?.token);

export const useCurrentUser = () =>
  useStore(sessionStore, (state) => state.user);

export const addUser = (user: User) => sessionStore.getState().addUser(user);

export const deleteToken = () => sessionStore.getState().deleteUser();

export const saveTokenToStorage = (token: string) => {
  setCookie('authToken', token);
};