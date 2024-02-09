import { StateCreator, createStore, useStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Api } from '~shared/api/realworld';

type ServicesSessionState = {
  services: Api.ServicePriceEntityDto[] ;
  setServices: (service: Api.ServicePriceEntityDto[]) => void;
};

const createServicesSessionSlice: StateCreator<
ServicesSessionState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  ServicesSessionState
> = (set) => ({
  services: [],
  setServices: (services) => {
    set({ services });
  },
});

export const servicesSessionStore = createStore<ServicesSessionState>()(
  persist(
    devtools(
      (...a) => ({
        ...createServicesSessionSlice(...a),
      }),
      { name: 'Services Session Store' },
    ),
    {
      name: 'servicesSession',
    },
  ),
);

export const useServicesState = () => useStore(servicesSessionStore).services;

export const setService = (services: Api.ServicePriceEntityDto[]) => {
  servicesSessionStore.getState().setServices(services);
};

export const addService = (service: Api.ServicePriceEntityDto) => {
  const { services } = servicesSessionStore.getState();
  const updatedServices = [service, ...services];
  servicesSessionStore.getState().setServices(updatedServices);
};

export const deleteService = (serviceId: number) => {
  const { services } = servicesSessionStore.getState();
  const servicesDelete = services.filter(({ id }) => id !== serviceId);
  servicesSessionStore.getState().setServices(servicesDelete);
};