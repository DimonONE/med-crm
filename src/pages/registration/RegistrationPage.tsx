import { useMemo, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { superAdminApi } from '~entities/super-admin';
import { useCreateClinicRequest } from '~features/session';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { Button } from '~shared/ui/button';
import { Modal } from '~shared/ui/modal';
import { SelectField } from '~shared/ui/select-field';
import { Container, TabsLink } from '~widgets/autch';

export function RegistrationPage() {
  const { data } = superAdminApi.useAllTypeClinic();
  const { mutate } = useCreateClinicRequest();
  const [isOpen, setOpen] = useState(false);

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

  const onSubmit = (
    values: Api.CreateClinicUserDtoDto,
    { setSubmitting, resetForm }: FormikHelpers<Api.CreateClinicUserDtoDto>,
  ) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(true);
        resetForm();
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="auth-page">
      <Container>
        <>
          <TabsLink />
          <Formik
            initialValues={{
              email: '',
              fullName: '',
              password: '',
              address: '',
              country: '',
              description: '',
              name: '',
              phone: '',
            }}
            validationSchema={object().shape({
              fullName: string().min(3).required(),
              name: string().min(3).required(),
              email: string().email().required(),
              password: string().min(8).required(),
              // type: string().test({
              //   name: 'type',
              //   message: 'Selected type',
              //   test(value) {
              //     return !!value;
              //   },
              // }),
              phone: string().required(),
            })}
            onSubmit={onSubmit}
          >
            {() => (
              <Form className='full-width center'>
                <div className='error-message'>
                  <ErrorMessage name="fullName" />
                </div>
                <Field
                  name="fullName"
                  className='form-input'
                  type="text"
                  placeholder="Название клиники"
                />

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

                <fieldset className='full-width center'>
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

                <fieldset className='full-width center'>
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

                <fieldset className='full-width center'>
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
                <fieldset className='full-width center'>
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
                <fieldset className='full-width center'>
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
                <fieldset className='full-width center'>
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

                <fieldset className='full-width center'>
                  <div className='error-message'>
                    <ErrorMessage name="name" />
                  </div>
                  <Field
                    name="name"
                    className='form-input'
                    type="text"
                    placeholder="Имя главврача"
                  />
                </fieldset>

                <fieldset className='full-width center'>
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
                <Button
                  className='form-submit'
                  type="submit"
                  color="primary"
                >
                  Подать заявку
                </Button>
              </Form>
            )}
          </Formik>

          <Modal
            isOpen={isOpen}
            type='info'
            onSuccess={() => setOpen(false)}
            onClose={() => setOpen(false)}
          >
            <div>
              Спасибо за регистрацию! <br />
              На вашу почту придет письмо, после
              подтверждения админа
            </div>
          </Modal>
        </>
      </Container>
    </div>
  );
}
