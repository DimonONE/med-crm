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

export interface FileSchemaDto {
  name: string;
  path: string;
  mimetype: string;
}

export interface CreateServicePriceDtoDto {
  /** Price service */
  price: number;
  /** Name Service */
  name: string;
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
  servicePrices: CreateServicePriceDtoDto[];
  notice?: string;
  user: UserEntityDto;
  subTreatments: SubTreatmentEntityDto[];
}

export interface AnswerBlockEntityDto {
  id: number;
  data: string;
  subTreatmentId: number;
  subTreatments: SubTreatmentEntityDto[];
}

export interface SubTreatmentEntityDto {
  id: number;
  treatmentId: number;
  recordId: number;
  positionId: number;
  plan: string;
  completed: string;
  comment: string;
  files: object[];
  treatment: TreatmentEntityDto;
  record: RecordEntityDto;
  answerBlock: AnswerBlockEntityDto;
}

export interface TreatmentEntityDto {
  id: number;
  doctorId: string;
  patientId: string;
  category: string;
  templateId: number;
  status: string;
  doctor: UserEntityDto;
  patient: PatientEntityDto;
  subTreatments: SubTreatmentEntityDto[];
}

export interface PatientEntityDto {
  files: FileSchemaDto[];
  medInfo: string;
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
  medInfoPath: string;
  user: UserEntityDto;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  treatmentsAsPatient: TreatmentEntityDto[];
}

export interface UserVisitsEntityDto {
  id: number;
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  user: UserEntityDto;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface UserWorkTimeEntityDto {
  id: number;
  dayOfWeek:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  user: UserEntityDto;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface UserVacationEntityDto {
  id: number;
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
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
  visits: UserVisitsEntityDto[];
  workTimes: UserWorkTimeEntityDto[];
  vacations: UserVacationEntityDto[];
  clinic: ClinicEntityDto;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  records: RecordEntityDto[];
  treatments: TreatmentEntityDto[];
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
  role?: 'superAdmin' | 'medChief' | 'doctor' | 'reception';
  /** Specialization for doctor */
  specialization?: string;
}

export interface VisitTimesDtoDto {
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
}

export interface CreateUpdateVisitTimeDtoDto {
  /** User id */
  userId: string;
  /**
   * need date
   * @format date-time
   */
  date: string;
  times: VisitTimesDtoDto[];
}

export interface CreateVacationDtoDto {
  /** User id */
  userId: string;
  /**
   * need date
   * @format date-time
   */
  startDate: string;
  /**
   * need date
   * @format date-time
   */
  endDate: string;
}

export interface TimesDtoDto {
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
}

export interface CreateUpdateWorkTimeDtoDto {
  /** User id */
  userId: string;
  /** Day of week  */
  dayOfWeek:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';
  times: TimesDtoDto[];
}

export interface ResponseVisitSchemaDto {
  doctor: UserEntityDto;
  totalWeek: number;
  totalMonth: number;
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
  role: 'superAdmin' | 'medChief' | 'doctor' | 'reception';
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
  з: object;
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
  role: 'superAdmin' | 'medChief' | 'doctor' | 'reception';
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

export interface MedInfoPatientDtoDto {
  /** med info in json */
  info: string;
  /** PatientId */
  patientId: string;
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
  servicePrices: CreateServicePriceDtoDto[];
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
  servicePrices: CreateServicePriceDtoDto[];
}

export interface ServicePriceEntityDto {
  id: number;
  name: string;
  price: number;
  clinicId: number;
}

export interface CreateTreatmentDtoDto {
  /** patient id */
  patientId: string;
  /** doctor id */
  doctorId: string;
  /** template id */
  templateId: number;
  /** status */
  status?: string;
  /** category */
  category?: string;
}

export interface UpdateTreatmentDtoDto {
  /** id */
  id: number;
  /** status */
  status?: string;
  /** category */
  category?: string;
}

export interface SubTreatmentDtoDto {
  /** record d patient */
  recordId: number;
  /** treatment id */
  treatmentId: number;
  /** treatment id */
  subTemplateId: number;
  /** completed */
  completed: string;
  /** comment */
  comment: string;
  /** plan */
  plan: string;
  /** Block info */
  blocks?: string;
  /**
   * Files
   * @format binary
   */
  files?: File;
}

export interface BlockDtoDto {
  /** id */
  id?: number;
  /** id */
  lineId?: number;
  /** id */
  sizeX: number;
  /** id */
  sizeY: number;
  /** id */
  positionId: number;
  /** id */
  space: number;
  /** id */
  status:
    | 'TEXT'
    | 'BOLD_TEXT'
    | 'CHECK_BOX'
    | 'RADIO_BOX'
    | 'DATE'
    | 'EMPTY'
    | 'WRITE_TEXT'
    | 'DROPDOWN'
    | 'POINT_TEXT';
}

export interface LineBlockDtoDto {
  /** id */
  id?: number;
  /** id */
  positionId: number;
  /** id */
  bodyBlockId?: number;
  /** id */
  blockInfo: BlockDtoDto[];
}

export interface BodyBlockDtoDto {
  /** id */
  id?: number;
  /** name body block */
  name: string;
  /** position */
  positionId: number;
  /** sub templates id */
  subTemplateId: number;
  /** id */
  lineBlocks: LineBlockDtoDto[];
}

export interface CreateSubTemplateDtoDto {
  /** name */
  name: string;
  /** template id */
  templateId: number;
}

export interface BlockEntityDto {
  id: number;
  lineId: number;
  sizeX: number;
  sizeY: number;
  positionId: number;
  space: number;
  status: string;
  lineBlock: LineBlockEntityDto;
}

export interface LineBlockEntityDto {
  id: number;
  positionId: number;
  bodyBlockId: number;
  bodyBlock: BodyBlockEntityDto;
  blocks: BlockEntityDto[];
}

export interface BodyBlockEntityDto {
  id: number;
  name: string;
  positionId: number;
  subTemplateId: number;
  subTemplate: SubTemplateEntityDto;
  lineBlocks: LineBlockEntityDto[];
}

export interface SubTemplateEntityDto {
  id: number;
  name: string;
  templateId: number;
  template: TemplateEntityDto;
  bodyBlocks: BodyBlockEntityDto[];
}

export interface TemplateEntityDto {
  id: number;
  category: string;
  name: string;
  techInfo: string;
  subTemplates: SubTemplateEntityDto[];
}

export interface TemplateDtoDto {
  /** id */
  id?: number;
  /** id */
  category?: string;
  /** id */
  name?: string;
  /** id */
  techInfo?: string;
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
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
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
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
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
      const r = response.clone() as HttpResponse<T, E>;
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
     * @name UsersControllerGetAllDoctors
     * @request GET:/users/doctors
     * @secure
     */
    usersControllerGetAllDoctors: (params: RequestParams = {}) =>
      this.request<UserResponseEntityDto[], any>({
        path: `/users/doctors`,
        method: 'GET',
        secure: true,
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
      this.request<UserResponseEntityDto, any>({
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

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerCreateVisits
     * @request POST:/users/create-visits
     * @secure
     */
    usersControllerCreateVisits: (
      data: CreateUpdateVisitTimeDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<UserVisitsEntityDto[], any>({
        path: `/users/create-visits`,
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
     * @name UsersControllerCreateVacations
     * @request POST:/users/create-vacation
     * @secure
     */
    usersControllerCreateVacations: (
      data: CreateVacationDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<UserVacationEntityDto, any>({
        path: `/users/create-vacation`,
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
     * @name UsersControllerCreateWorkTime
     * @request POST:/users/create-work-time
     * @secure
     */
    usersControllerCreateWorkTime: (
      data: CreateUpdateWorkTimeDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<UserWorkTimeEntityDto[], any>({
        path: `/users/create-work-time`,
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
     * @name UsersControllerGetWorkList
     * @request GET:/users/work-list
     * @secure
     */
    usersControllerGetWorkList: (
      query: {
        doctorName?: string;
        /**
         * Sort by ASC or DESC
         * @default "ASC"
         */
        sortBy?: 'ASC' | 'DESC' | null;
        fieldBySort?: string;
        /** @format date-time */
        date?: string;
        /** Need count patients */
        limit: number | null;
        /** Page */
        offset: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseVisitSchemaDto[], any>({
        path: `/users/work-list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
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

    /**
     * No description
     *
     * @tags Patients
     * @name PatientsControllerMedInfoCreate
     * @request POST:/patients/create-update-med-info
     */
    patientsControllerMedInfoCreate: (
      data: MedInfoPatientDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<PatientEntityDto, any>({
        path: `/patients/create-update-med-info`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
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
        /** Need user */
        userId: string;
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
     * @name RecordControllerGetAllRecordsPatient
     * @request GET:/record/get-all-records-patient
     * @secure
     */
    recordControllerGetAllRecordsPatient: (
      query: {
        /** Patient id */
        patientId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RecordEntityDto[], any>({
        path: `/record/get-all-records-patient`,
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
  treatment = {
    /**
     * No description
     *
     * @tags Treatment
     * @name TreatmentControllerGetTreatment
     * @request GET:/treatment/treatment-get
     * @secure
     */
    treatmentControllerGetTreatment: (
      query: {
        /** patient id */
        patientId: string;
        /** doctor id */
        doctorId: string;
        /** status */
        status?: string | null;
        /** category find */
        category?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<TreatmentEntityDto[], any>({
        path: `/treatment/treatment-get`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Treatment
     * @name TreatmentControllerGetreatmentById
     * @request GET:/treatment/treatment-get-by-id
     * @secure
     */
    treatmentControllerGetreatmentById: (params: RequestParams = {}) =>
      this.request<TreatmentEntityDto[], any>({
        path: `/treatment/treatment-get-by-id`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Treatment
     * @name TreatmentControllerCreateTreatment
     * @request POST:/treatment/treatment-create
     * @secure
     */
    treatmentControllerCreateTreatment: (
      data: CreateTreatmentDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<TreatmentEntityDto, any>({
        path: `/treatment/treatment-create`,
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
     * @tags Treatment
     * @name TreatmentControllerUpdateTreatment
     * @request POST:/treatment/treatment-update
     * @secure
     */
    treatmentControllerUpdateTreatment: (
      data: UpdateTreatmentDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<TreatmentEntityDto, any>({
        path: `/treatment/treatment-update`,
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
     * @tags Treatment
     * @name TreatmentControllerCreateAnswer
     * @request POST:/treatment/answer-create
     * @secure
     */
    treatmentControllerCreateAnswer: (
      data: SubTreatmentDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<AnswerBlockEntityDto, any>({
        path: `/treatment/answer-create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),
  };
  template = {
    /**
     * No description
     *
     * @tags Template
     * @name TemplateControllerCreatOrUpdateBodyBlock
     * @request POST:/template/create-update-body-block
     * @secure
     */
    templateControllerCreatOrUpdateBodyBlock: (
      data: BodyBlockDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/template/create-update-body-block`,
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
     * @tags Template
     * @name TemplateControllerCreateSubTemplate
     * @request POST:/template/create-sub-template
     * @secure
     */
    templateControllerCreateSubTemplate: (
      data: CreateSubTemplateDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<SubTemplateEntityDto, any>({
        path: `/template/create-sub-template`,
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
     * @tags Template
     * @name TemplateControllerUpdateTemplate
     * @request POST:/template/create-template
     * @secure
     */
    templateControllerUpdateTemplate: (
      data: TemplateDtoDto,
      params: RequestParams = {},
    ) =>
      this.request<TemplateEntityDto, any>({
        path: `/template/create-template`,
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
     * @tags Template
     * @name TemplateControllerGetTemplate
     * @request GET:/template/get-one/{id}
     * @secure
     */
    templateControllerGetTemplate: (id: number, params: RequestParams = {}) =>
      this.request<TemplateEntityDto, any>({
        path: `/template/get-one/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Template
     * @name TemplateControllerGetAllTemplate
     * @request GET:/template/get-all/{id}
     * @secure
     */
    templateControllerGetAllTemplate: (
      id: string,
      query?: {
        /** id */
        offset?: string;
        /** id */
        limit?: string;
        /** id */
        category?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/template/get-all/${id}`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),
  };
}
