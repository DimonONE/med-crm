import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { PATH_PAGE } from '~shared/lib/react-router';
import EmailICO from '~shared/svg/email-ico.svg';
import LockICO from '~shared/svg/lock-ico.svg';
import { Button } from '~shared/ui/button';
// import { ErrorHandler } from '~shared/ui/error-handler';
import { TextField } from '~shared/ui/text-field';
import { Container, TabsLink } from '~widgets/autch';

export function LoginPage() {
  // const { mutate, isError, error } = useLoginUser();
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      {/* {isError && <ErrorHandler error={error!} />} */}
      <Container >
        <>
          <TabsLink />
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={object().shape({
              email: string().email().required(),
              password: string().min(5).required(),
            })}
            onSubmit={() => {
              // mutate(values, {
              //   onSuccess: (response) => {
              //     sessionModel.addUser(response.data);
              //   },
              //   onSettled: () => {
              //     setSubmitting(false);
              //   },
              // });
              navigate(PATH_PAGE.allClinic);

            }}
          >
            {({ isSubmitting }) => (
              <Form className='full-width center'>
                <Field
                  name="email"
                >
                  {(props: FieldProps) =>
                    <TextField
                      {...props}
                      iconStart={<EmailICO />}
                      placeholder="Почта"
                      className='form-input'
                      type="text"
                    />}
                </Field>
                <Field
                  name="password"
                >
                  {(props: FieldProps) =>
                    <TextField
                      {...props}
                      placeholder="Пароль"
                      iconStart={<LockICO />}
                      className='form-input'
                      type="password"
                    />}
                </Field>

                <Button
                  className='form-submit'
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Вход
                </Button>

                <div className='error-message'>
                  <ErrorMessage name="email" />
                  <br />
                  <ErrorMessage name="password" />
                </div>
              </Form>
            )}
          </Formik>
        </>
      </Container>
    </div >
  );
}
