import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import { object, string } from 'yup';
// import { sessionModel } from '~entities/session';
import { Button } from '~shared/ui/button';
// import { ErrorHandler } from '~shared/ui/error-handler';
import { SelectField } from '~shared/ui/select-field';
import { Container, TabsLink } from '~widgets/autch';

export function RegisterPage() {
  // const { isError, error } = useCreateUser();
  const selectOptions = [{ value: '12', label: 'Option 12' }, { value: '1', label: 'Option 1' }, { value: '10', label: 'Option 10' }];

  return (
    <div className="auth-page">
      {/* {isError && <ErrorHandler error={error} />} */}

      <Container>
        <>
          <TabsLink />

          <Formik
            initialValues={{
              clinicName: '',
              typeClinic: '',
              address: '',
              side: '',
              backyard: '',
              email: '',
            }}
            validationSchema={object().shape({
              clinicName: string().min(5).required(),
              email: string().email().required(),
            })}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSubmit={() => {

              // mutate(values, {
              //   onSuccess: (response) => {
              //     sessionModel.addUser(response.data.user);
              //   },
              //   onSettled: () => {
              //     setSubmitting(false);
              //   },
              // });
            }}
          >
            {({ isSubmitting }) => (
              <Form className='full-width center'>
                <fieldset disabled={isSubmitting} className='full-width center'>
                  <fieldset className='full-width center'>
                    <Field
                      name="clinicName"
                      className='form-input'
                      type="text"
                      placeholder="Название клиники"
                    />
                    <ErrorMessage name="clinicName" />
                  </fieldset>

                  <fieldset className='full-width center'>
                    <Field
                      name="typeClinic"
                      className='form-input'
                      placeholder="Тип клиники"
                    >
                      {(props: FieldProps) =>
                        <SelectField
                          {...props}
                          className='form-input'
                          selectOptions={selectOptions}
                        />}
                    </Field>
                    <ErrorMessage name="typeClinic" />
                  </fieldset>

                  <fieldset className='full-width center'>
                    <Field
                      name="address"
                      className='form-input'
                      type="text"
                      placeholder="Адрес"
                    />
                    <ErrorMessage name="address" />
                  </fieldset>

                  <fieldset className='full-width center'>
                    <Field
                      name="side"
                      className='form-input'
                      type="text"
                      placeholder="Страна"
                    />
                    <ErrorMessage name="side" />
                  </fieldset>

                  <fieldset className='full-width center'>
                    <Field
                      name="email"
                      className='form-input'
                      type="text"
                      placeholder="Город"
                    />
                    <ErrorMessage name="email" />
                  </fieldset>
                  <fieldset className='full-width center'>
                    <Field
                      name="email"
                      className='form-input'
                      type="text"
                      placeholder="+7 (000) - 00 - 00"
                    />
                    <ErrorMessage name="email" />
                  </fieldset>
                  <fieldset className='full-width center'>
                    <Field
                      name="email"
                      className='form-input'
                      type="text"
                      placeholder="Почта"
                    />
                    <ErrorMessage name="email" />
                  </fieldset>
                  <fieldset className='full-width center'>
                    <Field
                      name="username"
                      className='form-input'
                      type="text"
                      placeholder="Имя главврача"
                    />
                    <ErrorMessage name="username" />
                  </fieldset>
                  <fieldset className='full-width center'>
                    <div className='form-textarea-label'>Краткое описание</div>
                    <Field
                      name="comment"
                      className='form-textarea'
                      type="text"
                      placeholder="Коментарий..."
                      component="textarea"
                    />
                    <ErrorMessage name="comment" />
                  </fieldset>
                </fieldset>


                <Button
                  className='form-submit'
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Подать заявку
                </Button>
              </Form>
            )}
          </Formik>
        </>
      </Container>
    </div>
  );
}
