import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import s from './styles.module.scss';

export function AddPatientPage() {
  return (
    <div className={s.root}>
      <BackButton title='Добавить клиента' />
      <div className={s.formContainer}>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            phone: '',
            passportNumber: '',
            issuedBy: '',
            inn: '',
            country: '',
            city: '',
            address: '',
          }}
          validationSchema={object().shape({
            fullName: string().min(5).required(),
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
                    name="fullName"
                    className='form-input'
                    type="text"
                    placeholder="ФИО"
                  />
                  <ErrorMessage name="fullName" />
                </fieldset>

                <fieldset className='full-width'>
                  <Field
                    name="email"
                    className='form-input'
                    type="text"
                    placeholder="Почта"
                  />
                  <ErrorMessage name="email" />
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

                <fieldset>
                  <Field
                    name="passportNumber"
                    className='form-input'
                    type="text"
                    placeholder="Номер паспорта"
                  />
                  <ErrorMessage name="passportNumber" />
                </fieldset>

                <fieldset>
                  <Field
                    name="issuedBy"
                    className='form-input'
                    type="text"
                    placeholder="Кем выдан"
                  />
                  <ErrorMessage name="issuedBy" />
                </fieldset>

                <fieldset>
                  <Field
                    name="inn"
                    className='form-input form-input-text'
                    type="text"
                    placeholder="ИНН"
                  />
                  <ErrorMessage name="inn" />
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
              <Button
                className={classNames(s.submit, 'form-submit')}
                type="submit"
                color="primary"
                disabled={isSubmitting}
              >
                Создать
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
