
import classNames from 'classnames';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import { object, string } from 'yup';
import { LoadImage } from '~features/patients';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import { FileLoader } from '~shared/ui/file-loader';
import { SelectField } from '~shared/ui/select-field';
import s from './styles.module.scss';

type Params = {
  personalId?: string
};

export function EmployeeManagement() {
  const params = useParams<Params>();

  const selectOptions = [{ value: '0', label: 'Пол' }, { value: '1', label: 'Мужской' }, { value: '2', label: 'Женский' }];

  return (
    <div className={s.root}>
      <BackButton title={params?.personalId ? 'Редактировать пациента' : 'Добавить пациента'} />
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
            gender: '',
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
              <div className={s.userInfo} >
                <span className='full-width'>


                  <div className={s.formLabel}>
                    Паспортные данные
                  </div>
                  <div>
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
                  </div>
                </span>
                <span className={classNames(s.userInfoGender)}>
                  <LoadImage />

                  <div className={s.date}>Дата рождения</div>
                  <DatePicker sx={{
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
                  }} className={s.datePicker} onChange={() => false} />

                  <Field
                    name="gender"
                    className='form-input'
                  >
                    {(props: FieldProps) =>
                      <SelectField
                        {...props}
                        className={classNames(s.select, 'form-input')}
                        selectOptions={selectOptions}
                      />}
                  </Field>
                </span>
              </div>
              <div className={s.loadFails}>
                <span className={s.title}>Прикрепленные документы</span>
                <FileLoader
                  id="button-load-file"
                  title='Загрузить'
                />
              </div>

              <fieldset className='full-width'>
                <div className='form-textarea-label'>Заметка</div>
                <Field
                  name="comment"
                  className={classNames(s.comment, 'form-textarea')}
                  type="text"
                  placeholder="Заметка"
                  component="textarea"
                />
                <ErrorMessage name="comment" />
              </fieldset>
              <Button
                className={classNames(s.submit, 'form-submit')}
                type="submit"
                color="primary"
                disabled={isSubmitting}
              >
                Сохранить
              </Button>

              {
                params?.personalId && (
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
