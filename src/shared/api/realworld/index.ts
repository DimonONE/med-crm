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
    },
    format: 'json',
  },
  securityWorker: (token) =>
    token ? { headers: { Authorization: `Token ${token}` } } : {},
});

export { realworldApi };
export type {
  HttpResponse,
  RequestParams,
  UserEntityDto,
  CreateUserDtoDto,
};
