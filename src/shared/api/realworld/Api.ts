/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserDtoDto {
  /** First name of the user */
  fullName: string;
  /** Email of the user */
  email: string;
  /** Phone of the user */
  phone: string;
  /** Image of the user */
  image?: string | null;
  /** Password of the user */
  password: string;
  /** Role for user */
  role: 'superAdmin' | 'medChief' | 'doctor' | 'patient';
  /** Specialization for doctor */
  specialization?: string;
}

export interface LoginUserDtoDto {
  /** Email user */
  email: string;
  /** Password user */
  password: string;
}

export interface FileSchemaDto {
  name: string;
  path: string;
  mimetype: string;
}

export interface PatientEntityDto {
  files: FileSchemaDto;
  id: string;
  fullName: string;
  passport: string;
  country: string;
  city: string;
  address: string;
  sex: string;
  status: string;
  passportIssuingAuthority: string;
  tin: string;
  /** @format date-time */
  dateOfBirth: string;
  notice: string;
  email: string;
  phone: string;
  image: string;
  user: UserEntityDto;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface UserEntityDto {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  image: string;
  password: string;
  role: RoleEntityDto;
  specialization?: string;
  createdBy: string;
  status: string;
  patients: PatientEntityDto[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface RoleEntityDto {
  id: number;
  name: string;
  users: UserEntityDto[];
}

export interface UserResponseEntityDto {
  status: 'approval' | 'notapproval';
  id: string;
  fullName: string;
  email: string;
  phone: string;
  image: string;
  role: RoleEntityDto;
  specialization?: string;
  createdBy: string;
  patients: PatientEntityDto[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface UpdateUserDtoDto {
  /** First name of the user */
  fullName?: string;
  /** Email of the user */
  email?: string;
  /** Phone of the user */
  phone?: string;
  /** Image of the user */
  image?: string | null;
  /** Password of the user */
  password?: string;
  /** Role for user */
  role?: 'superAdmin' | 'medChief' | 'doctor' | 'patient';
  /** Specialization for doctor */
  specialization?: string;
}

export interface CreatePatientDtoDto {
  /** Full name of the patient */
  fullName: string;
  /** Patient passport id */
  passport: string;
  /** Patient country */
  country: string;
  /** Patient city */
  city: string;
  /** Patient address */
  address: string;
  /** passport issuing authority */
  passportIssuingAuthority: string;
  /** Patient sex */
  sex: 'man' | 'woman';
  /** Passport issued by */
  tin: string;
  /** Email of the patient */
  email: string;
  /** Phone of the patient */
  phone: string;
  /**
   * Date of birth of the patient
   * @format date-time
   */
  dateOfBirth: string;
  /** Notice about patient */
  notice?: string | null;
  /**
   * Patient photo
   * @format binary
   */
  image?: File;
  /**
   * Patient document scan
   * @format binary
   */
  files?: File;
}

export interface GetPatientsSchemaDto {
  totalCount: number;
  patients: PatientEntityDto[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'http://stage.medicare-online.info';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`,
    )}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Med CRM
 * @version 0.1
 * @contact
 *
 * Application for medical clinic
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerCreateUser
     * @request POST:/users/create
     * @secure
     */
    usersControllerCreateUser: (
      data: CreateUserDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/users/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerMakeProposal
     * @request POST:/users/make_proposal
     * @secure
     */
    usersControllerMakeProposal: (
      data: CreateUserDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/users/make_proposal`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerLogin
     * @request POST:/users/login
     */
    usersControllerLogin: (data: LoginUserDtoDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/users/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'text',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetRoles
     * @request GET:/users/roles
     * @secure
     */
    usersControllerGetRoles: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/roles`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetсurentUser
     * @request GET:/users/currentuser
     * @secure
     */
    usersControllerGetсurentUser: (params: RequestParams = {}) =>
      this.request<UserResponseEntityDto, UserResponseEntityDto>({
        path: `/users/currentuser`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetListOfAviableUser
     * @request GET:/users/listofusers
     * @secure
     */
    usersControllerGetListOfAviableUser: (params: RequestParams = {}) =>
      this.request<object[], any>({
        path: `/users/listofusers`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetUserById
     * @request GET:/users/user/{id}
     * @secure
     */
    usersControllerGetUserById: (id: string, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/users/user/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdate
     * @request PATCH:/users/update
     * @secure
     */
    usersControllerUpdate: (
      data: UpdateUserDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/users/update`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerRemoveCard
     * @request DELETE:/users/delete
     * @secure
     */
    usersControllerRemoveCard: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/delete`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  patients = {
    /**
     * No description
     *
     * @tags Patients
     * @name PatientsControllerCreatePatient
     * @request POST:/patients/create
     * @secure
     * 
     */
    patientsControllerCreatePatient: (
      data: CreatePatientDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<PatientEntityDto, PatientEntityDto>({
        path: `/patients/create`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Patients
     * @name PatientsControllerGetPatientById
     * @request GET:/patients/{id}
     */
    patientsControllerGetPatientById: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<PatientEntityDto, any>({
        path: `/patients/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Patients
     * @name PatientsControllerGetPatients
     * @request GET:/patients
     */
    patientsControllerGetPatients: (
      query: {
        /** Need count patients */
        limit: number | null;
        /** Page */
        offset: number | null;
        /**
         * Sort by ASC or DESC
         * @default "ASC"
         */
        sortBy: 'ASC' | 'DESC' | null;
        /** Doctor name */
        filter: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPatientsSchemaDto, any>({
        path: `/patients`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
}
