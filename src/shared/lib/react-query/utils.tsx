export function errorHandler(error: any): string {
  if (typeof error.response.data.message === 'object') {
    return error.response.data.message[0];
  }

  return error.response.data.message || 'Error!';
}
