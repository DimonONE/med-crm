import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { FullPageError } from '~shared/ui/full-page-error';
import { QueryClientProvider } from './QueryClientProvider';
import { Router } from './RouterProvider';
import 'dayjs/locale/ru';

export function Provider() {
  return (
    <ErrorBoundary FallbackComponent={FullPageError}>
      <QueryClientProvider>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <Router />
          </LocalizationProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
