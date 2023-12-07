import { useEffect } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { sessionApi } from '~entities/session';
import { LoadImage } from '~features/patients';
import { Api, HttpResponse } from '~shared/api/realworld';
import { errorHandler, queryClient } from '~shared/lib/react-query';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import { FileLoader } from '~shared/ui/file-loader';
import { SelectField } from '~shared/ui/select-field';
import { useCreatePersonal, useUpdatePersonnel } from '../../api/personnelApi';
import s from './styles.module.scss';

type Props = {
  personnelId?: string
  isCreate: boolean
};

type ManagementPersonalDto = Api.CreatePersonalDtoDto | Api.UpdatePersonalDtoDto;

export function PersonnelManagementForm({ personnelId, isCreate }: Props) {
  const { data, isLoading } = sessionApi.useGetUserId(personnelId || '');
  const { mutate: create } = useCreatePersonal();
  const { mutate: update } = useUpdatePersonnel();

  const navigate = useNavigate();
  const selectOptions = [{ value: '0', label: 'Пол' }, { value: 'man', label: 'Мужской' }, { value: 'woman', label: 'Женский' }];
  const roleOptions = [{ value: '0', label: 'Должность' }, { value: 'doctor', label: 'doctor' }];

  const onSubmit = async (
    values: ManagementPersonalDto,
    { setSubmitting, resetForm }: FormikHelpers<ManagementPersonalDto>,
  ) => {
    try {
      // Update personnel
      if (!isCreate && personnelId && (('newImage' in values) || ('newFiles' in values))) {
        await update({ ...values, id: personnelId.toString() }, {
          onSuccess: () => {
            toast('Success!', { type: 'success' });
            resetForm();
          },
          onError: (error) => {
            toast(errorHandler(error as HttpResponse<any, any>), { type: 'error' });
          },
        });
      } else if ('password' in values) {
        await create(values, {
          onSuccess: () => {
            toast('Success!', { type: 'success' });
            resetForm();
          },
          onError: (error) => {
            toast(errorHandler(error as HttpResponse<any, any>), { type: 'error' });
          },
        });
      }

    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => () => {
    queryClient.removeQueries(sessionApi.sessionKeys.users.getUserId());
    navigate(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personnelId]);


  if (personnelId && (!data && !isLoading)) {
    return <Navigate to={PATH_PAGE.personnel.details(personnelId)} />;
  }

  if (!data && isLoading) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        fullName: data?.fullName ?? '',
        passport: data?.passport ?? '',
        country: data?.country ?? '',
        role: (data?.role?.name ?? '') as keyof Roles,
        city: data?.city ?? '',
        address: data?.address ?? '',
        password: data?.password ?? '',
        passportIssuingAuthority: data?.passportIssuingAuthority ?? '',
        sex: (data?.sex ?? '') as 'man',
        tin: data?.tin ?? '',
        email: data?.email ?? '',
        phone: data?.phone ?? '',
        dateOfBirth: data?.dateOfBirth ?? '',
        notice: data?.notice ?? '',
        newFiles: null,
      }}
      validationSchema={object().shape({
        fullName: string().required(),
        email: string().email().required(),
        dateOfBirth: string().required(),
        role: string().required(),
        sex: string().required(),
      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='full-width'>
          <div className={s.userInfo} >
            <span className='full-width'>
              <div className='error-message'>
                <ErrorMessage name="role" />
              </div>
              <Field
                name="role"
                className='form-input'
              >
                {(props: FieldProps) =>
                  <SelectField
                    {...props}
                    className={classNames('form-input')}
                    selectOptions={roleOptions}
                  />}
              </Field>

              <div className={s.formLabel}>
                Паспортные данные
              </div>
              <div>
                <fieldset disabled={isSubmitting}>
                  <fieldset className='full-width'>
                    <div className='error-message'>
                      <ErrorMessage name="fullName" />
                    </div>
                    <Field
                      name="fullName"
                      className='form-input'
                      type="text"
                      placeholder="ФИО"
                    />
                  </fieldset>

                  <fieldset className='full-width'>
                    <div className='error-message'>
                      <ErrorMessage name="email" />
                    </div>
                    <Field
                      name="email"
                      className='form-input'
                      type="text"
                      placeholder="Почта"
                    />
                  </fieldset>

                  <fieldset className='full-width'>
                    <Field
                      name="phone"
                      className='form-input'
                      type="text"
                      placeholder="Телефон"
                    />
                    <ErrorMessage name="phone" />
                  </fieldset>

                  {
                    !personnelId && (
                      <fieldset className='full-width'>
                        <div className='error-message'>
                          <ErrorMessage name="password" />
                        </div>
                        <Field
                          name="password"
                          className='form-input'
                          type="text"
                          placeholder="Пароль"
                        />
                      </fieldset>
                    )
                  }

                  <fieldset>
                    <div className='error-message'>
                      <ErrorMessage name="passport" />
                    </div>
                    <Field
                      name="passport"
                      className='form-input'
                      type="text"
                      placeholder="Номер паспорта"
                    />
                  </fieldset>

                  <fieldset>
                    <Field
                      name="passportIssuingAuthority"
                      className='form-input'
                      type="text"
                      placeholder="Кем выдан"
                    />
                    <ErrorMessage name="passportIssuingAuthority" />
                  </fieldset>

                  <fieldset>
                    <Field
                      name="tin"
                      className='form-input form-input-text'
                      type="text"
                      placeholder="ИНН"
                    />
                    <ErrorMessage name="tin" />
                  </fieldset>

                  <fieldset>
                    <Field
                      name="country"
                      className='form-input'
                      type="text"
                      placeholder="Страна"
                    />
                    <ErrorMessage name="country" />
                  </fieldset>

                  <fieldset>
                    <Field
                      name="city"
                      className='form-input'
                      type="text"
                      placeholder="Город \ поселок"
                    />
                    <ErrorMessage name="city" />
                  </fieldset>

                  <fieldset>
                    <Field
                      name="address"
                      className='form-input'
                      type="text"
                      placeholder="Адрес"
                    />
                    <ErrorMessage name="address" />
                  </fieldset>
                </fieldset>
              </div>
            </span>
            <span className={classNames(s.userInfoGender)}>
              <fieldset>
                <Field
                  name="image"
                  type='file'
                  className='form-input'
                >{({ form }: FieldProps) =>
                  <LoadImage
                    isLoad
                    onChange={(file) => {
                      form.setFieldValue('image', file);
                    }} />}
                </Field>
                <div className='error-message'>
                  <ErrorMessage name="image" />
                </div>
              </fieldset>

              <fieldset>
                <div className={s.date}>Дата рождения</div>
                <Field
                  name="dateOfBirth"
                  className='form-input'
                >
                  {({ form }: FieldProps) =>
                    <DatePicker
                      value={dayjs(form?.values?.dateOfBirth)}
                      onChange={(value) => {
                        form.setFieldValue('dateOfBirth', dayjs(value as string).toISOString());
                      }}
                      className={s.datePicker}
                      sx={{
                        '.MuiInputBase-root.MuiOutlinedInput-root': {
                          width: '207px',
                          padding: '0 20px',
                          maxWidth: 'none',
                          background: '#FFF',
                          borderRadius: '69px',
                          border: '1px solid #578695',
                          fontSize: '18px',
                          color: '#A1B6C1',
                        },
                        '.MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root': {
                          color: '#A1B6C1',
                        },
                      }} />
                  }
                </Field>
                <div className='error-message'>
                  <ErrorMessage name="dateOfBirth" />
                </div>
              </fieldset>

              <fieldset>
                <Field
                  name="sex"
                  className='form-input'
                >
                  {(props: FieldProps) =>
                    <SelectField
                      {...props}
                      className={classNames(s.select, 'form-input')}
                      selectOptions={selectOptions}
                    />}
                </Field>
                <div className='error-message'>
                  <ErrorMessage name="sex" />
                </div>
              </fieldset>

            </span>
          </div>
          <div className={s.loadFails}>
            <span className={s.title}>Прикрепленные документы</span>
            <fieldset>
              <Field
                name="fiels"
                className='form-input'
              >
                {({ form }: FieldProps) =>
                  <FileLoader
                    id="button-load-file"
                    title='Загрузить'
                    onChange={(fiels) => form.setFieldValue('fiels', fiels)}
                  />
                }
              </Field>
              <div className='error-message'>
                <ErrorMessage name="fiels" />
              </div>
            </fieldset>
          </div>

          <fieldset className='full-width'>
            <div className='form-textarea-label'>Заметка</div>
            <Field
              name="notice"
              className={classNames(s.comment, 'form-textarea')}
              type="text"
              placeholder="Заметка"
              component="textarea"
            />
            <div className='error-message'>
              <ErrorMessage name="notice" />
            </div>
          </fieldset>
          <Button
            className={classNames(s.submit, 'form-submit')}
            type="submit"
            color="primary"
            disabled={isSubmitting}
          >
            Сохранить
          </Button>

          {
            personnelId && (
              <Button
                className={classNames(s.delete, 'form-submit')}
                type="submit"
                color="primary"
                disabled={isSubmitting}
              >
                Удалить
              </Button>
            )
          }
        </Form>
      )}
    </Formik>
  );
}
