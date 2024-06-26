import { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { Api, HttpResponse } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { PATH_PAGE } from '~shared/lib/react-router';
import { passwordValidationSchema } from '~shared/lib/utils';
import { Button } from '~shared/ui/button';
import { SelectField } from '~shared/ui/select-field';
import { useAllTypeClinic, useCreateClinic, useUpdateClinic } from '../../api/superAdminApi';
import { addClinicInfo, deleteClinicInfo, useClinicInfo } from '../../model/superAdminModel';
import { UpdatePasswordForm } from '../update-password/UpdatePasswordForm';
import s from './styles.module.scss';

type Props = {
  clinicId?: number
  isCreate: boolean
};

type ClinicUserDtoDto = Api.CreateClinicUserDtoDto | Api.UpdateClinicUserDtoDto;

export function ClinicManagementForm({ clinicId, isCreate }: Props) {
  const navigate = useNavigate();
  const { data } = useAllTypeClinic();
  const { mutate: create } = useCreateClinic();
  const { mutate: update } = useUpdateClinic();
  const clinicInfo = useClinicInfo();

  const typesClinic = useMemo(() => {
    const typePlaceholder = {
      value: -1,
      label: 'Выберите тип клиники',
    };

    if (data) {
      const types = data.map((type) => ({
        value: type.name,
        label: type.name,
      }));

      return [typePlaceholder, ...types];
    }

    return [typePlaceholder];
  }, [data]);

  const onSubmit = async (
    values: ClinicUserDtoDto,
    { setSubmitting, resetForm }: FormikHelpers<ClinicUserDtoDto>,
  ) => {
    try {
      if (!isCreate && clinicInfo?.id) {
        await update({ ...values, userId: clinicInfo.id }, {
          onSuccess: (updateData) => {
            addClinicInfo(updateData);
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

  useEffect(() => {
    if (isCreate && clinicInfo) {
      navigate(0);
      deleteClinicInfo();
    }

    // eslint-disable-next-line func-names
    return function () {
      deleteClinicInfo();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicInfo, isCreate]);


  if (clinicId && !clinicInfo) {
    return <Navigate to={PATH_PAGE.superAdmin.selectClinic(clinicId)} />;
  }

  return (
    <Formik
      initialValues={{
        email: clinicInfo?.email ?? '',
        fullName: clinicInfo?.fullName ?? '',
        password: '',
        address: clinicInfo?.clinic.address ?? '',
        country: clinicInfo?.clinic.country ?? '',
        city: clinicInfo?.clinic.city ?? '',
        description: clinicInfo?.clinic.description ?? '',
        name: clinicInfo?.clinic.name ?? '',
        phone: clinicInfo?.phone ?? '',
        type: clinicInfo?.clinic.type?.name,
      }}
      validationSchema={object().shape({
        fullName: string().min(3).required(),
        name: string().min(3).required(),
        email: string().email().required(),
        password: passwordValidationSchema,
        type: string().test({
          name: 'type',
          message: 'Selected type',
          test(value) {
            return !!value;
          },
        }),
        phone: string().required(),
      })}
      onSubmit={(event, options) => onSubmit(event, options as FormikHelpers<ClinicUserDtoDto>)}
    >
      {({ isSubmitting }) => (
        <Form className={s.form}>
          <fieldset disabled={isSubmitting}>
            <fieldset className='full-width'>
              <div className='error-message'>
                <ErrorMessage name="name" />
              </div>
              <Field
                name="name"
                className='form-input'
                type="text"
                placeholder="Название клиники"
              />
            </fieldset>

            <fieldset className='full-width'>
              <Field
                name="type"
                className='form-input'
                placeholder="Тип клиники"
              >
                {(props: FieldProps) => <>
                  <div className='error-message'>
                    {props.form.errors?.type as string}
                  </div>
                  <SelectField
                    {...props}
                    className='form-input'
                    selectOptions={typesClinic}
                  />
                </>
                }
              </Field>
            </fieldset>

            <fieldset className='full-width'>
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
              <ErrorMessage name="country" />
            </fieldset>

            <fieldset>
              <div className='error-message'>
                <ErrorMessage name="city" />
              </div>
              <Field
                name="city"
                className='form-input form-input-text'
                type="text"
                placeholder="Город"
              />
            </fieldset>
            <fieldset>
              <div className='error-message'>
                <ErrorMessage name="phone" />
              </div>
              <Field
                name="phone"
                className='form-input'
                type="text"
                placeholder="+7 (000) - 00 - 00"
              />
            </fieldset>
            <fieldset>
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
            {
              isCreate && (
                <fieldset>
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
                <ErrorMessage name="fullName" />
              </div>
              <Field
                name="fullName"
                className='form-input'
                type="text"
                placeholder="Имя главврача"
              />
            </fieldset>

            <fieldset className='full-width'>
              <div className='form-textarea-label'>Краткое описание</div>
              <Field
                name="description"
                className='form-textarea'
                type="text"
                placeholder="Коментарий..."
                component="textarea"
              />
              <div className='error-message'>
                <ErrorMessage name="description" />
              </div>
            </fieldset>
          </fieldset>

          {clinicInfo?.id && <UpdatePasswordForm userId={clinicInfo.id} />}

          <Button
            className={classNames(s.submit, 'form-submit')}
            type="submit"
            color="primary"
            disabled={isSubmitting}
          >
            {clinicId ? 'Сохранить' : 'Создать'}

          </Button>
        </Form>
      )}
    </Formik>
  );
}
