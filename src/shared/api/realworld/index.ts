import { getCookie } from 'cookies-next';
import { Api, ContentType } from './Api';
import type {
  HttpResponse,
  RequestParams,
  UserEntityDto,
  CreateUserDtoDto,
} from './Api';


const realworldApi = new Api<string>({
  baseApiParams: {
    headers: {
      'Content-Type': ContentType.Json,
      'Authorization': `Bearer ${getCookie('authToken')}`,
    },
    format: 'json',
  },
  // securityWorker: (token) => token ? { headers: { Authorization: `Bearer ${token}` } } : {},
});

export { realworldApi };
export type {
  HttpResponse,
  RequestParams,
  UserEntityDto,
  CreateUserDtoDto,
};
export * as Api from './Api';
