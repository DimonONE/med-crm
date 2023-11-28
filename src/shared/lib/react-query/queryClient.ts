import { QueryClient } from '@tanstack/react-query';
import { PATH_PAGE } from '../react-router';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      onError: (error: any) => {
        if (window.location.pathname !== PATH_PAGE.login && error.status === 401  ) {
          window.location.pathname = PATH_PAGE.logout;
        }
      },
    },
  },
});
