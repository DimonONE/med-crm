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
import { useCreatePatient } from '../../api/patientsApi';
import s from './styles.module.scss';

type Props = {
  patientId?: string
  isCreate: boolean
};

type ManagementPersonalDto = Api.CreatePatientDtoDto;
// | Api.UpdateUserDtoDto;

export function PatientsManagementForm({ patientId, isCreate }: Props) {
  const { data, isLoading } = sessionApi.useGetUserId(patientId || '', { enabled: !!patientId });
  const { mutate: create } = useCreatePatient();
  const [isOpen, setOpen] = useState(false);

  // const { mutate: update } = useUpa();

  const getInitialValue = <K extends keyof ManagementPersonalDto>(key: K): ManagementPersonalDto[K] | string =>
    patientId ? (data?.[key] as ManagementPersonalDto[K]) : '';

  const initialValues: ManagementPersonalDto = {
    fullName: getInitialValue('fullName'),
    address: getInitialValue('address'),
    city: getInitialValue('city'),
    passport: getInitialValue('passport'),
    country: getInitialValue('country'),
    passportIssuingAuthority: getInitialValue('passportIssuingAuthority'),
    sex: (getInitialValue('sex') || sexOptions[0].value) as 'man',
    tin: getInitialValue('tin'),
    email: getInitialValue('email'),
    phone: getInitialValue('phone'),
    dateOfBirth: getInitialValue('dateOfBirth'),
    notice: getInitialValue('notice'),
    // ...(!isCreate ? {
    //   id: patientId.toString(),
    //   files: data?.files,
    // } : {}),
    ...(isCreate ? {
      password: data?.password ?? '',
      files: [],
      image: null,
    } : {}),
  } as ManagementPersonalDto;



  const onSubmit = async (
    values: ManagementPersonalDto,
    { setSubmitting, resetForm }: FormikHelpers<ManagementPersonalDto>,
  ) => {
    try {
      // Update personnel
      // if (patientId && (('newImage' in values) || ('newFiles' in values))) {
      // await update(values, {
      //   onSuccess: () => {
      //     toast('Success!', { type: 'success' });
      //     resetForm();
      //   },
      //   onError: (error) => {
      //     toast(errorHandler(error), { type: 'error' });
      //   },
      // });
      // } else if ('password' in values) {
      await create(values as Api.CreatePatientDtoDto, {
        onSuccess: () => {
          setOpen(true);
          resetForm();
        },
        onError: (error) => {
          toast(errorHandler(error), { type: 'error' });
        },
      });
      // }
    } finally {
      setSubmitting(false);
    }
  };

  if (patientId && (!data && !isLoading)) {
    return <Navigate to={PATH_PAGE.personnel.details(patientId)} />;
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
        passportIssuingAuthority: string().required(),
        address: string().min(4).required(),
        city: string().min(4).required(),
        country: string().min(4).required(),
        passport: string().min(8).lowercase().uppercase().required(),
        phone: string().required(),
        tin: string().required(),
      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={classNames(s.container, 'full-width')}>
          <div className={s.userInfo} >
            <span className='full-width'>
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
                      errors
                    />
                  </fieldset>

                  <fieldset className='full-width'>
                    <div className='error-message'>
                      <ErrorMessage name="phone" />
                    </div>
                    <Field
                      name="phone"
                      className='form-input'
                      type="text"
                      placeholder="Телефон"
                    />
                  </fieldset>

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
                    <div className='error-message'>
                      <ErrorMessage name="passportIssuingAuthority" />
                    </div>
                    <Field
                      name="passportIssuingAuthority"
                      className='form-input'
                      type="text"
                      placeholder="Кем выдан"
                    />
                  </fieldset>

                  <fieldset>
                    <div className='error-message'>
                      <ErrorMessage name="tin" />
                    </div>
                    <Field
                      name="tin"
                      className='form-input form-input-text'
                      type="text"
                      placeholder="ИНН"
                    />
                  </fieldset>

                  <fieldset>
                    <div className='error-message'>
                      <ErrorMessage name="country" />
                    </div>
                    <Field
                      name="country"
                      className='form-input'
                      type="text"
                      placeholder="Страна"
                    />
                  </fieldset>

                  <fieldset>
                    <div className='error-message'>
                      <ErrorMessage name="city" />
                    </div>
                    <Field
                      name="city"
                      className='form-input'
                      type="text"
                      placeholder="Город \ поселок"
                    />
                  </fieldset>

                  <fieldset>
                    <div className='error-message'>
                      <ErrorMessage name="address" />
                    </div>
                    <Field
                      name="address"
                      className='form-input'
                      type="text"
                      placeholder="Адрес"
                    />
                  </fieldset>
                </fieldset>
              </div>
            </span>
            <span className={classNames(s.userInfoGender)}>
              <fieldset className='center'>
                <Field
                  name="image"
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
                >{({ form, meta }: FieldProps) =>
                  <DatePicker
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
                    }}
                    className={s.datePicker}
                    value={meta.value}
                    onChange={(date) =>
                      date && form.setFieldValue('dateOfBirth', dayjs(date as string).toISOString())
                    } />
                  }
                </Field>
                <div className='error-message'>
                  <ErrorMessage name="dateOfBirth" />
                </div>
              </fieldset>

              <fieldset className='full-width'>
                <Field
                  name="sex"
                  className='form-input'
                >
                  {(props: FieldProps) =>
                    <SelectField
                      {...props}
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

          <fieldset className='full-width'>
            <div className={s.loadFails}>
              <div className='error-message'>
                <ErrorMessage name="files" />
              </div>
              <span className={s.title}>Прикрепленные документы</span>
              <Field
                name="files"
              >{({ form, meta }: FieldProps) =>
                <FileLoader
                  id="button-load-file"
                  title='Загрузить'
                  filesData={meta.value}
                  onChange={(files) => form.setFieldValue('files', files)}
                  onDelete={() => undefined}
                />}</Field>
            </div>
          </fieldset>
          <div className='form-textarea-label'>Заметка</div>
          <Field
            name="notice"
            className={classNames(s.comment, 'form-textarea')}
            type="text"
            placeholder="Заметка"
            component="textarea"
          />
          <div>
            <Button
              className={classNames(s.submit, 'form-submit')}
              type="submit"
              color="primary"
              disabled={isSubmitting}
            >
              Сохранить
            </Button>

            {
              patientId && (
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
          </div>

          <Modal
            isOpen={isOpen}
            onSuccess={() => setOpen(false)}
            onClose={() => setOpen(false)}
            type='info' >
            <div>
              {isCreate ? 'Пациент успешно создан!' : 'Данные успешно сохранены!'}
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
}
