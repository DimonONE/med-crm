import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { sessionModel } from '~entities/session';
import { useCurrentUser, useLoginUser } from '~features/session';
import { PATH_PAGE } from '~shared/lib/react-router';
import EmailICO from '~shared/svg/email-ico.svg';
import LockICO from '~shared/svg/lock-ico.svg';
import { Button } from '~shared/ui/button';
import { ErrorHandler } from '~shared/ui/error-handler';
import { TextField } from '~shared/ui/text-field';
import { Container, TabsLink } from '~widgets/autch';

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginPage() {
  const { mutate, isError, error } = useLoginUser();
  const { refetch: refetchCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleLoginSuccess = async (token: string) => {
    const { data } = await refetchCurrentUser();

    const dat = data?.data;
    if (data?.data) {
      const userData = {
        ...dat,
        token,
      };

      sessionModel.addUser(userData as sessionModel.User);
      navigate(PATH_PAGE.superAdmin.root);
    }
  };

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
  ) => {
    mutate(values, {
      onSuccess: (response) => {
        sessionModel.saveTokenToStorage(response.data);
        handleLoginSuccess(response.data);
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };


  return (
    <div className="auth-page">
      {isError && <ErrorHandler error={error!} />}
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
            onSubmit={handleLogin}
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
