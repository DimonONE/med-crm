import { QueryClient } from '@tanstack/react-query';
import { sessionApi, sessionModel } from '~entities/session';

export function logout(queryClient: QueryClient) {
  sessionModel.logout();
  queryClient.removeQueries(sessionApi.sessionKeys.session.currentUser());
}
