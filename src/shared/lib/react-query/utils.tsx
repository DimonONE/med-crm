export function errorHandler(error: any): string {
  if (typeof error.error.message === 'object') {
    return error.error.message[0];
  }

  return error.error.message || 'Error!';
}
