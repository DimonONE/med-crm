import { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { sessionApi } from '~entities/session';
import { LoadImage } from '~features/patients';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { PATH_PAGE } from '~shared/lib/react-router';
import { sexOptions } from '~shared/lib/utils';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import { FileLoader } from '~shared/ui/file-loader';
import { Modal } from '~shared/ui/modal';
import { SelectField } from '~shared/ui/select-field';
import { useCreatePersonal, useUpdatePersonnel } from '../../api/personnelApi';
import { rolesPersonnelOptions } from '../../lib/utils';
import s from './styles.module.scss';

type Props = {
  personnelId?: string
  isCreate: boolean
};

type ManagementPersonalDto = Api.CreatePersonalDtoDto | Api.UpdatePersonalDtoDto;

export function PersonnelManagementForm({ personnelId, isCreate }: Props) {
  const { data, isLoading } = sessionApi.useGetUserId(personnelId || '', { enabled: !!personnelId });
  const { mutate: create } = useCreatePersonal();
  const { mutate: update } = useUpdatePersonnel();
  const [isOpen, setOpen] = useState(false);

  const getInitialValue = <K extends keyof ManagementPersonalDto>(key: K): ManagementPersonalDto[K] | string =>
    personnelId ? (data?.[key] as ManagementPersonalDto[K]) : '';

  const initialValues: ManagementPersonalDto = {
    fullName: getInitialValue('fullName'),
    passport: getInitialValue('passport'),
    country: getInitialValue('country'),
    role: (getInitialValue('role') || rolesPersonnelOptions[0].value) as keyof Roles,
    city: getInitialValue('city'),
    address: getInitialValue('address'),
    passportIssuingAuthority: getInitialValue('passportIssuingAuthority'),
    sex: (getInitialValue('sex') || sexOptions[0].value) as 'man',
    tin: getInitialValue('tin'),
    email: getInitialValue('email'),
    phone: getInitialValue('phone'),
    dateOfBirth: getInitialValue('dateOfBirth'),
    notice: getInitialValue('notice'),
    ...(personnelId ? {
      id: personnelId.toString(),
      files: data?.files,
      image: data?.image,
    } : {}),
    ...(isCreate ? { password: data?.password ?? '' } : {}),
  } as ManagementPersonalDto;



  const onSubmit = async (
    values: ManagementPersonalDto,
    { setSubmitting, resetForm }: FormikHelpers<ManagementPersonalDto>,
  ) => {
    try {
      // Update personnel
      if (personnelId && (('newImage' in values) || ('newFiles' in values))) {
        await update(values, {
          onSuccess: () => {
            setOpen(true);
            resetForm();
          },
          onError: (error) => {
            toast(errorHandler(error), { type: 'error' });
          },
        });
      } else if ('password' in values) {
        await create(values, {
          onSuccess: () => {
            setOpen(true);
            resetForm();
          },
          onError: (error) => {
            toast(errorHandler(error), { type: 'error' });
          },
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (personnelId && (!data && !isLoading)) {
    return <Navigate to={PATH_PAGE.personnel.details(personnelId)} />;
  }

  if (!isCreate && (!data && isLoading)) {
    return null;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={object().shape({
        fullName: string().required(),
        email: string().email().required(),
        dateOfBirth: string().required(),
        role: string().test((value) => Number(value) !== -1),
        sex: string().test((value) => Number(value) !== -1),
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
                    selectOptions={rolesPersonnelOptions}
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
              <fieldset className='center'>
                <Field
                  name="image"
                  type='file'
                  className='form-input'
                >{({ form, meta }: FieldProps) =>
                  <LoadImage
                    isLoad
                    defaultImage={meta.value}
                    onChange={(file) => {
                      form.setFieldValue(isCreate ? 'image' : 'newImage', file);
                    }} />
                  }
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
                      defaultOption={props.field.value}
                      className={classNames(s.select, 'form-input')}
                      selectOptions={sexOptions}
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
                name="files"
                className='form-input'
              >
                {({ form }: FieldProps) =>
                  <FileLoader
                    id="button-load-file"
                    title='Загрузить'
                    onChange={(files) => {
                      form.setFieldValue(isCreate ? 'files' : 'newFiles', files);
                    }}
                    onDelete={(files) => {
                      form.setFieldValue(isCreate ? 'files' : 'newFiles', files);
                    }}
                  />
                }
              </Field>
              <div className='error-message'>
                <ErrorMessage name="files" />
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

          <Modal
            isOpen={isOpen}
            onSuccess={() => setOpen(false)}
            onClose={() => setOpen(false)}
            type='info' >
            <div>
              {isCreate ? 'Персонал успешно создан!' : 'Данные успешно сохранены!'}
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
}
