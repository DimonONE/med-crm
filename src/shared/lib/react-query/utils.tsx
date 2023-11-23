/* eslint-disable func-names */
/* eslint-disable no-console */
import { HttpResponse } from '~shared/api/realworld';

export function errorHandler(error: HttpResponse<any, any>): string {
  if (typeof error.error.message === 'object') {
    return error.error.message[0];
  }

  return error.error.message || 'Error!';
}
