import classNames from 'classnames';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { SelectField } from '~shared/ui/select-field';
import s from './styles.module.scss';

export function EditClinics() {
  return (
    <div className={s.editClinic}>
      <BackButton link={PATH_PAGE.addClinic} title='Редактировать клинику' />
      <div className={s.formContainer}>
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
            <Form className='full-width'>
              <fieldset disabled={isSubmitting}>
                <fieldset className='full-width'>
                  <Field
                    name="clinicName"
                    className='form-input'
                    type="text"
                    placeholder="Название клиники"
                  />
                  <ErrorMessage name="clinicName" />
                </fieldset>

                <fieldset className='full-width'>
                  <Field
                    name="typeClinic"
                    className='form-input'
                    placeholder="Тип клиники"
                  >
                    {(props: FieldProps) =>
                      <SelectField
                        {...props}
                        className='form-input'
                        selectOptions={[{ value: '30', label: 'test2' }, { value: 10, label: 'test' }]}
                      />}
                  </Field>
                  <ErrorMessage name="typeClinic" />
                </fieldset>

                <fieldset className='full-width'>
                  <Field
                    name="address"
                    className='form-input'
                    type="text"
                    placeholder="Адрес"
                  />
                  <ErrorMessage name="address" />
                </fieldset>

                <fieldset>
                  <Field
                    name="side"
                    className='form-input'
                    type="text"
                    placeholder="Страна"
                  />
                  <ErrorMessage name="side" />
                </fieldset>

                <fieldset>
                  <Field
                    name="email"
                    className='form-input form-input-text'
                    type="text"
                    placeholder="Город"
                  />
                  <ErrorMessage name="email" />
                </fieldset>
                <fieldset>
                  <Field
                    name="email"
                    className='form-input'
                    type="text"
                    placeholder="+7 (000) - 00 - 00"
                  />
                  <ErrorMessage name="email" />
                </fieldset>
                <fieldset>
                  <Field
                    name="email"
                    className='form-input'
                    type="text"
                    placeholder="Почта"
                  />
                  <ErrorMessage name="email" />
                </fieldset>
                <fieldset>
                  <Field
                    name="username"
                    className='form-input'
                    type="text"
                    placeholder="Имя главврача"
                  />
                  <ErrorMessage name="username" />
                </fieldset>

                <fieldset className='full-width'>
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
                className={classNames(s.submit, 'form-submit')}
                type="submit"
                color="primary"
                disabled={isSubmitting}
              >
                Сохранить
              </Button>
            </Form>
          )}
        </Formik>
      </div>

    </div>
  );
}
