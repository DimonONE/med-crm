import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { sessionModel } from '~entities/session';
import { useCurrentUser, useGetRoles, useLoginUser } from '~features/session';
import { PATH_PAGE } from '~shared/lib/react-router';
import EmailICO from '~shared/svg/email-ico.svg';
import LockICO from '~shared/svg/lock-ico.svg';
import { Button } from '~shared/ui/button';
import { TextField } from '~shared/ui/text-field';
import { Container, TabsLink } from '~widgets/autch';

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginPage() {
  const { mutate } = useLoginUser();
  const { refetch: refetchCurrentUser } = useCurrentUser({ enabled: false });
  const { refetch: refetchGetRoles } = useGetRoles({ enabled: false });
  const navigate = useNavigate();

  const handleLoginSuccess = async () => {
    const { data: userData } = await refetchCurrentUser();

    if (userData) {
      const rolesData = await refetchGetRoles();
      sessionModel.addUser(userData);

      if (rolesData?.data) {
        const roles: Roles = rolesData.data as unknown as Roles;
        sessionModel.addRoles(roles);
        navigate(PATH_PAGE.root);
      }
    }
  };

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
  ) => {
    mutate(values, {
      onSuccess: async (response) => {
        await sessionModel.saveTokenToStorage(response.data);
        handleLoginSuccess();
      },
      onSettled: () => {
        setSubmitting(false);
      },
      onError: () => {
        toast('User not found!', { type: 'error' });
      },
    });
  };


  return (
    <div className="auth-page">
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
