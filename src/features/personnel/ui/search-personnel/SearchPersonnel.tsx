import classNames from 'classnames';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { PATH_PAGE } from '~shared/lib/react-router';
import { TextField } from '~shared/ui/text-field';
import s from './styles.module.scss';
import SearchICO from './svg/search-ico.svg';

export function SearchPersonnel() {
  // const { mutate, isError, error } = useLoginUser();
  const navigate = useNavigate();

  return (
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
        navigate(PATH_PAGE.superAdmin.root);

      }}
    >
      {() => (
        <Form className={s.root}>
          <button type='button' className={s.name} >Ф.И.О.</button>
          <Field
            name="search"
          >
            {(props: FieldProps) =>
              <TextField
                {...props}
                iconEnd={<SearchICO />}
                placeholder="Поиск"
                className={classNames('form-input', s.search)}
                type="text"
              />}
          </Field>
        </Form>
      )}
    </Formik>
  );
}
