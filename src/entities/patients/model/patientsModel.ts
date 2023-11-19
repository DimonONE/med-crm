import { StateCreator, createStore, useStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Api } from '~shared/api/realworld';

type PatientSessionState = {
  patient: Api.PatientEntityDto | null;
  addPatient: (patient: Api.PatientEntityDto) => void;
  deletePatient: () => void;
};

const createPatientSessionSlice: StateCreator<
  PatientSessionState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  PatientSessionState
> = (set) => ({
  patient: null,

  addPatient: (patient: Api.PatientEntityDto) => {
    set({ patient }, false, 'patientSession/addPatient');
  },

  deletePatient: () => {
    set({ patient: null }, false, 'patientSession/deletePatient');
  },
});

export const patientSessionStore = createStore<PatientSessionState>()(
  persist(
    devtools(
      (...a) => ({
        ...createPatientSessionSlice(...a),
      }),
      { name: 'Patient Session Store' },
    ),
    {
      name: 'patientSession',
    },
  ),
);

export const usePatientSession = () =>
  useStore(patientSessionStore, (state) => !!state.patient);

export const useCurrentPatient = () =>
  useStore(patientSessionStore, (state) => state.patient);

export const addPatient = (patient: Api.PatientEntityDto) => patientSessionStore.getState().addPatient(patient);

export const deletePatient = () => patientSessionStore.getState().deletePatient();