import { StateCreator, createStore, useStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Api } from '~shared/api/realworld';

type SuperAdminSessionState = {
  clinicInfo: Api.UserEntityDto | null;
  addClinicInfo: (patient: Api.UserEntityDto) => void;
  deleteClinicInfo: () => void;
};

const createSuperAdminSessionSlice: StateCreator<
SuperAdminSessionState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  SuperAdminSessionState
> = (set) => ({
  clinicInfo: null,

  addClinicInfo: (clinicInfo: Api.UserEntityDto) => {
    set({ clinicInfo }, false, 'superAdminSession/addPatient');
  },

  deleteClinicInfo: () => {
    set({ clinicInfo: null }, false, 'superAdminSession/deletePatient');
  },
});

export const superAdminSessionStore = createStore<SuperAdminSessionState>()(
  persist(
    devtools(
      (...a) => ({
        ...createSuperAdminSessionSlice(...a),
      }),
      { name: 'Super admin Session Store' },
    ),
    {
      name: 'superAdminSession',
    },
  ),
);

export const useClinicInfo = () =>
  useStore(superAdminSessionStore, (state) => state.clinicInfo);

export const addClinicInfo = (clinicInfo: Api.UserEntityDto) => 
  superAdminSessionStore.getState().addClinicInfo(clinicInfo);

export const deleteClinicInfo = () => 
  superAdminSessionStore.getState().deleteClinicInfo();
