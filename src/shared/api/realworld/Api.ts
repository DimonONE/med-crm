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

export interface LoginUserDtoDto {
  /** Email user */
  email: string;
  /** Password user */
  password: string;
}

export interface CreateClinicUserDtoDto {
  /** Name clinic */
  name?: string;
  /** Short description clinic */
  description?: string;
  /** Phone of the clinic */
  phone?: string;
  /** Address of the clinic */
  address?: string;
  /** Country of the clinic */
  country?: string;
  /** Country of the clinic */
  city?: string;
  /** Type of the clinic (category) */
  type?: string;
  /** First name of the user */
  fullName: string;
  /** Password of the user */
  password: string;
  /** Email of the user */
  email: string;
}

export interface MessageResponseDto {
  message: string;
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

export interface TypeClinicEntityDto {
  id: number;
  name: string;
  clinics: ClinicEntityDto[];
}

export interface ClinicEntityDto {
  id: number;
  name: string;
  description: string;
  address: string;
  country: string;
  city: string;
  phone: string;
  type: TypeClinicEntityDto;
  users: UserEntityDto[];
  status: boolean;
  /** @format date-time */
  endPaidDate: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  save: object;
}

export interface RecordEntityDto {
  id: number;
  userId: string;
  clinicId: object;
  patientId: string;
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  status: string;
  servicePrices: object[];
  notice?: string;
  user: UserEntityDto;
}

export interface UserEntityDto {
  files: FileSchemaDto;
  id: string;
  fullName: string;
  email: string;
  phone: string;
  image: string;
  password: string;
  role: RoleEntityDto;
  specialization?: string;
  createdBy: string;
  /** @format date-time */
  dateOfBirth: string;
  tin: string;
  passportIssuingAuthority: string;
  passport: string;
  notice: string;
  sex: string;
  status: string;
  country: string;
  city: string;
  address: string;
  patients: PatientEntityDto[];
  clinic: ClinicEntityDto;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  records: RecordEntityDto[];
}

export interface RoleEntityDto {
  id: number;
  name: string;
  users: UserEntityDto[];
}

export interface UserResponseEntityDto {
  status: 'approval' | 'pending' | 'notapproval';
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

export interface UpdateClinicUserDtoDto {
  /** Name clinic */
  name?: string;
  /** Short description clinic */
  description?: string;
  /** Phone of the clinic */
  phone?: string;
  /** Address of the clinic */
  address?: string;
  /** Country of the clinic */
  country?: string;
  /** Country of the clinic */
  city?: string;
  /** Type of the clinic (category) */
  type?: string;
  /** First name of the user */
  userId: string;
  /** First name of the user */
  fullName: string;
  /** Email of the user */
  email: string;
}

export interface CreateTypeClinicDtoDto {
  /** Type clinic */
  type: string;
}

export interface SwitchStatusDtoDto {
  /** Id clinic */
  id: number;
}

export interface SwitchStatusUserDtoDto {
  /** id user */
  id: string;
  /** Status */
  status: 'approval' | 'pending' | 'notapproval';
}

export interface SetNewPasswordDtoDto {
  userId: string;
  password: string;
}

export interface CreatePersonalDtoDto {
  /** Full name of the patient */
  fullName: string;
  /** Patient passport id */
  passport: string;
  /** Patient country */
  country: string;
  /** Role for user */
  role: 'superAdmin' | 'medChief' | 'doctor' | 'patient';
  /** Patient city */
  city: string;
  /** Patient address */
  address: string;
  /** Password of the user */
  password: string;
  /** passport issuing authority */
  passportIssuingAuthority: string;
  /** Personal sex */
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

export interface UpdatePersonalDtoDto {
  /** id user */
  id: string;
  /** Full name of the personal */
  fullName: string;
  /** Personal passport id */
  passport: string;
  /** Personal country */
  country: string;
  /** Role for user */
  role: 'superAdmin' | 'medChief' | 'doctor' | 'patient';
  /** Personal city */
  city: string;
  /** Personal address */
  address: string;
  /** passport issuing authority */
  passportIssuingAuthority: string;
  /** Personal sex */
  sex: 'man' | 'woman';
  /** Passport issued by */
  tin: string;
  /** Email of the personal */
  email: string;
  /** Phone of the personal */
  phone: string;
  /**
   * Date of birth of the personal
   * @format date-time
   */
  dateOfBirth: string;
  /** Notice about personal */
  notice?: string | null;
  /** Files personal */
  files: object[] | null;
  /** Image personal */
  image?: string | null;
  /**
   * Personal photo
   * @format binary
   */
  newImage?: File;
  /**
   * Personal document scan
   * @format binary
   */
  newFiles?: File;
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

export interface UpdatePatientDtoDto {
  /** Id patient */
  id: string;
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
  /** files patient */
  files: object[] | null;
  /** Image patient */
  image?: string | null;
  /**
   * Patient photo
   * @format binary
   */
  newImage?: File;
  /**
   * Patient document scan
   * @format binary
   */
  newFiles?: File;
}

export interface CreateRecordDtoDto {
  /** Patient id */
  patientId: string;
  /** Doctor id */
  userId: string;
  /**
   * Date of start record
   * @format date-time
   */
  startTime: string;
  /**
   * Date of end record
   * @format date-time
   */
  endTime: string;
  /** Notice record */
  notice: string;
  /** Price list */
  servicePrices: object[];
}

export interface UpdateRecordDTODto {
  /** Record id */
  id: number;
  /** Doctor id */
  userId: string;
  /**
   * Date of start record
   * @format date-time
   */
  startTime: string;
  /**
   * Date of end record
   * @format date-time
   */
  endTime: string;
  /** Notice record */
  notice: string;
  /** Price list */
  servicePrices: object[];
}

export interface CreateServicePriceDtoDto {
  /** Price service */
  price: number;
  /** Name Service */
  name: string;
}

export interface ServicePriceEntityDto {
  id: number;
  name: string;
  price: number;
  clinicId: number;
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
  public baseUrl: string = '';
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
     * @name UsersControllerLogin
     * @request POST:/users/login
     */
    usersControllerLogin: (data: LoginUserDtoDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/users/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerMakeProposal
     * @request POST:/users/create
     */
    usersControllerMakeProposal: (
      data: CreateClinicUserDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<MessageResponseDto, any>({
        path: `/users/create`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
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
  admin = {
    /**
     * No description
     *
     * @tags Admin
     * @name UsersAdminControllerCreateClinic
     * @request POST:/admin/create-clinic
     * @secure
     */
    usersAdminControllerCreateClinic: (
      data: CreateClinicUserDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<UserEntityDto, any>({
        path: `/admin/create-clinic`,
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
     * @tags Admin
     * @name UsersAdminControllerUpdateClinic
     * @request POST:/admin/update-clinic
     * @secure
     */
    usersAdminControllerUpdateClinic: (
      data: UpdateClinicUserDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<UserEntityDto, any>({
        path: `/admin/update-clinic`,
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
     * @tags Admin
     * @name UsersAdminControllerAddTypeClinic
     * @request POST:/admin/add-type-clinic
     * @secure
     */
    usersAdminControllerAddTypeClinic: (
      data: CreateTypeClinicDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<TypeClinicEntityDto, any>({
        path: `/admin/add-type-clinic`,
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
     * @tags Admin
     * @name UsersAdminControllerGetAllTypeClinic
     * @request GET:/admin/all-type-clinic
     * @secure
     */
    usersAdminControllerGetAllTypeClinic: (params: RequestParams = {}) =>
      this.request<TypeClinicEntityDto[], any>({
        path: `/admin/all-type-clinic`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name UsersAdminControllerSwitchStatusClinic
     * @request POST:/admin/switch-status-clinic
     * @secure
     */
    usersAdminControllerSwitchStatusClinic: (
      data: SwitchStatusDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<ClinicEntityDto, any>({
        path: `/admin/switch-status-clinic`,
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
     * @tags Admin
     * @name UsersAdminControllerStatusUser
     * @request POST:/admin/switch-status-user
     * @secure
     */
    usersAdminControllerStatusUser: (
      data: SwitchStatusUserDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseEntityDto, any>({
        path: `/admin/switch-status-user`,
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
     * @tags Admin
     * @name UsersAdminControllerSetNewPassword
     * @request POST:/admin/set-new-password
     * @secure
     */
    usersAdminControllerSetNewPassword: (
      data: SetNewPasswordDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<MessageResponseDto, any>({
        path: `/admin/set-new-password`,
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
     * @tags Admin
     * @name UsersAdminControllerGetListOfAviableUser
     * @request GET:/admin/listofusers
     * @secure
     */
    usersAdminControllerGetListOfAviableUser: (
      query: {
        /** Need count patients */
        limit: number | null;
        /** set Approve for get all clinics, set pending for get applications */
        status: 'approval' | 'pending' | 'notapproval';
        /** Page */
        offset: number | null;
        /**
         * Sort by ASC or DESC
         * @default "ASC"
         */
        sortBy: 'ASC' | 'DESC' | null;
        /** Field to sort by  */
        fieldSort: string | null;
        /** Type clinic */
        category: string | null;
        /** Doctor name */
        filter: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserEntityDto[], any>({
        path: `/admin/listofusers`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name UsersAdminControllerCreatePersonal
     * @request POST:/admin/create-personal
     * @secure
     */
    usersAdminControllerCreatePersonal: (
      data: CreatePersonalDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseEntityDto, PatientEntityDto>({
        path: `/admin/create-personal`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name UsersAdminControllerUpdatePersonal
     * @request POST:/admin/update-personal
     * @secure
     */
    usersAdminControllerUpdatePersonal: (
      data: UpdatePersonalDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseEntityDto, PatientEntityDto>({
        path: `/admin/update-personal`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name UsersAdminControllerGetAllPersonal
     * @request GET:/admin/all-personal
     * @secure
     */
    usersAdminControllerGetAllPersonal: (
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
        /** Field to sort by  */
        fieldSort: string | null;
        /** Role user */
        role: string | null;
        /** Doctor name */
        filter: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserEntityDto[], any>({
        path: `/admin/all-personal`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
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
     */
    patientsControllerCreatePatient: (
      data: CreatePatientDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<PatientEntityDto, PatientEntityDto>({
        path: `/patients/create`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Patients
     * @name PatientsControllerUpdatePatient
     * @request POST:/patients/update
     */
    patientsControllerUpdatePatient: (
      data: UpdatePatientDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<PatientEntityDto, PatientEntityDto>({
        path: `/patients/update`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
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
      this.request<PatientEntityDto[], any>({
        path: `/patients`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  record = {
    /**
     * No description
     *
     * @tags Record
     * @name RecordControllerCreateRecord
     * @request POST:/record/create
     * @secure
     */
    recordControllerCreateRecord: (
      data: CreateRecordDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<RecordEntityDto, any>({
        path: `/record/create`,
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
     * @tags Record
     * @name RecordControllerUpdateRecord
     * @request POST:/record/update
     * @secure
     */
    recordControllerUpdateRecord: (
      data: UpdateRecordDTODto,
      params: RequestParams = {},
    ) =>
      this.request<RecordEntityDto, any>({
        path: `/record/update`,
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
     * @tags Record
     * @name RecordControllerDeleteRecord
     * @request DELETE:/record/delete-record/{id}
     * @secure
     */
    recordControllerDeleteRecord: (id: number, params: RequestParams = {}) =>
      this.request<MessageResponseDto, any>({
        path: `/record/delete-record/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Record
     * @name RecordControllerGetRecords
     * @request GET:/record/get-all-records
     * @secure
     */
    recordControllerGetRecords: (
      query: {
        /**
         * Date find
         * @format date-time
         */
        date: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RecordEntityDto[], any>({
        path: `/record/get-all-records`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Record
     * @name RecordControllerCreateServicePrice
     * @request POST:/record/create-service-price
     * @secure
     */
    recordControllerCreateServicePrice: (
      data: CreateServicePriceDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<ServicePriceEntityDto, any>({
        path: `/record/create-service-price`,
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
     * @tags Record
     * @name RecordControllerDeleteServicePrice
     * @request DELETE:/record/delete-service-price/{id}
     * @secure
     */
    recordControllerDeleteServicePrice: (
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<MessageResponseDto, any>({
        path: `/record/delete-service-price/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Record
     * @name RecordControllerGetServices
     * @request GET:/record/get-all-service-prices
     * @secure
     */
    recordControllerGetServices: (params: RequestParams = {}) =>
      this.request<ServicePriceEntityDto[], any>({
        path: `/record/get-all-service-prices`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
