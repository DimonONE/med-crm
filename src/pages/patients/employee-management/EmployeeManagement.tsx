
import classNames from 'classnames';
import dayjs from 'dayjs';
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { patientsApi, useCreatePatient } from '~entities/patients';
import { LoadImage } from '~features/patients';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import { FileLoader } from '~shared/ui/file-loader';
import { SelectField } from '~shared/ui/select-field';
import s from './styles.module.scss';

type Params = {
  patientId?: string
};


export function EmployeeManagement() {
  const { mutate } = useCreatePatient();
  const params = useParams<Params>();
  const selectOptions = [{ value: '0', label: 'Пол' }, { value: 'man', label: 'Мужской' }, { value: 'woman', label: 'Женский' }];

  const onSubmit = (
    values: patientsApi.CreatePatientDto,
    { setSubmitting }: FormikHelpers<patientsApi.CreatePatientDto>,
  ) => {

    mutate(values, {
      onSuccess: () => {
        toast('Success!');
      },
      onError: () => {
        toast('Error!', { type: 'error' });
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className={s.root}>
      <BackButton title={params?.patientId ? 'Редактировать пациента' : 'Добавить пациента'} />
      <div className={s.formContainer}>
        <Formik
          initialValues={{
            fullName: '',
            address: '',
            city: '',
            country: '',
            dateOfBirth: '',
            email: '',
            passport: '',
            passportIssuingAuthority: '',
            phone: '',
            sex: '',
            tin: '',
            notice: '',
            image: undefined,
            files: undefined,
          }}
          validationSchema={object().shape({
            fullName: string().min(5).required(),
            email: string().email().required(),
            passportIssuingAuthority: string().required(),
            dateOfBirth: string().required(),
            address: string().min(4).required(),
            city: string().min(4).required(),
            country: string().min(4).required(),
            passport: string().min(8).lowercase().uppercase().required(),
            phone: string().required(),
            tin: string().required(),
            sex: string().required(),
          })}
          onSubmit={onSubmit}
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
                        <div className='error-message'>
                          <ErrorMessage name="fullName" />
                        </div>
                        <Field
                          name="fullName"
                          className='form-input'
                          type="text"
                          placeholder="ФИО"
                        />
                      </fieldset>

                      <fieldset className='full-width'>
                        <div className='error-message'>
                          <ErrorMessage name="email" />
                        </div>
                        <Field
                          name="email"
                          className='form-input'
                          type="text"
                          placeholder="Почта"
                          errors
                        />
                      </fieldset>

                      <fieldset className='full-width'>
                        <div className='error-message'>
                          <ErrorMessage name="phone" />
                        </div>
                        <Field
                          name="phone"
                          className='form-input'
                          type="text"
                          placeholder="Телефон"
                        />
                      </fieldset>

                      <fieldset>
                        <div className='error-message'>
                          <ErrorMessage name="passport" />
                        </div>
                        <Field
                          name="passport"
                          className='form-input'
                          type="text"
                          placeholder="Номер паспорта"
                        />
                      </fieldset>

                      <fieldset>
                        <div className='error-message'>
                          <ErrorMessage name="passportIssuingAuthority" />
                        </div>
                        <Field
                          name="passportIssuingAuthority"
                          className='form-input'
                          type="text"
                          placeholder="Кем выдан"
                        />
                      </fieldset>

                      <fieldset>
                        <div className='error-message'>
                          <ErrorMessage name="tin" />
                        </div>
                        <Field
                          name="tin"
                          className='form-input form-input-text'
                          type="text"
                          placeholder="ИНН"
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
                      </fieldset>

                      <fieldset>
                        <div className='error-message'>
                          <ErrorMessage name="city" />
                        </div>
                        <Field
                          name="city"
                          className='form-input'
                          type="text"
                          placeholder="Город \ поселок"
                        />
                      </fieldset>

                      <fieldset>
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
                    </fieldset>
                  </div>
                </span>
                <span className={classNames(s.userInfoGender)}>
                  <fieldset>
                    <Field
                      name="image"
                      className='form-input'
                    >{({ form }: FieldProps) =>
                      <LoadImage onChange={(file) => form.setFieldValue('image', file)} />}
                    </Field>
                    <div className='error-message'>
                      <ErrorMessage name="image" />
                    </div>
                  </fieldset>

                  <fieldset>
                    <div className={s.date}>Дата рождения</div>
                    <Field
                      name="dateOfBirth"
                      className='form-input'
                    >{({ form }: FieldProps) =>
                      <DatePicker
                        sx={{
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
                        }}
                        className={s.datePicker}
                        onChange={(date) =>
                          date && form.setFieldValue('dateOfBirth', dayjs(date as string).toISOString())
                        } />
                      }
                    </Field>
                    <div className='error-message'>
                      <ErrorMessage name="dateOfBirth" />
                    </div>
                  </fieldset>

                  <fieldset className='full-width'>
                    <Field
                      name="sex"
                      className='form-input'
                    >
                      {(props: FieldProps) =>
                        <SelectField
                          {...props}
                          className={classNames(s.select, 'form-input')}
                          selectOptions={selectOptions}
                        />}
                    </Field>
                    <div className='error-message'>
                      <ErrorMessage name="sex" />
                    </div>
                  </fieldset>
                </span>
              </div>

              <fieldset className='full-width'>
                <div className={s.loadFails}>
                  <div className='error-message'>
                    <ErrorMessage name="files" />
                  </div>
                  <span className={s.title}>Прикрепленные документы</span>
                  <Field
                    name="files"
                  >{({ form }: FieldProps) =>
                    <FileLoader
                      id="button-load-file"
                      title='Загрузить'
                      onChange={(files) => form.setFieldValue('files', files)}
                    />}</Field>
                </div>
              </fieldset>
              <div className='form-textarea-label'>Заметка</div>
              <Field
                name="notice"
                className={classNames(s.comment, 'form-textarea')}
                type="text"
                placeholder="Заметка"
                component="textarea"
              />
              <Button
                className={classNames(s.submit, 'form-submit')}
                type="submit"
                color="primary"
                disabled={isSubmitting}
              >
                Сохранить
              </Button>

              {
                params?.patientId && (
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
