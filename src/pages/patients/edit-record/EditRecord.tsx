
import classNames from 'classnames';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { object } from 'yup';
import { WorkDay, WorkTime } from '~entities/work-time';
import CloseICO from '~shared/svg/close-gray-ico.svg';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import { SelectField } from '~shared/ui/select-field';
import { TimeSelect } from '~shared/ui/time-select';
import s from './styles.module.scss';



export function EditRecord() {
  const selectOptions = [{ value: '0', label: 'Имя врача' }, { value: '1', label: 'Dima' }, { value: '2', label: 'Ivan' }];


  return (
    <div className={s.root}>
      <BackButton title="Записать пациента на прием" />
      <div className={s.formContainer}>
        <Formik
          initialValues={{
            nameDoctor: '',
            complaint: '',
            addServices: '',
          }}
          validationSchema={object().shape({
            // fullName: string().min(5).required(),
            // email: string().email().required(),
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
          {({ isSubmitting, values }) => (
            <Form className='full-width'>
              <div className={s.label}>Имя врача</div>
              <Field
                name="nameDoctor"
                className='form-input'
              >
                {(props: FieldProps) =>
                  <SelectField
                    {...props}
                    className={classNames(s.select, 'form-input')}
                    selectOptions={selectOptions}
                  />}
              </Field>
              {
                Boolean(values.nameDoctor) && (
                  <>

                    <div className={s.label}>График приема</div>
                    <div className={s.dateWork}>
                      <DatePicker
                        className={s.datePicker}
                        onChange={() => false}
                      />
                      <WorkDay className={s.workDay} />
                    </div>
                    <WorkTime className={s.workTime} />

                    <TimeSelect selectOptions={selectOptions} />

                    <div className={s.times}>
                      <TimeSelect title='Время от' selectOptions={selectOptions} />
                      <TimeSelect title='Время до' selectOptions={selectOptions} />
                    </div>

                    <fieldset className={classNames(s.complaint, 'full-width')}>
                      <div className={s.label}>Жалоба</div>
                      <Field
                        name="complaint"
                        className={classNames(s.complaintField, 'form-textarea')}
                        type="text"
                        placeholder="Заметка"
                        component="textarea"
                      />
                      <ErrorMessage name="complaint" />
                    </fieldset>

                    <div className={s.label}>Добавить услуги</div>
                    <div className={s.addServicesBlock}>
                      <Field
                        name="addServices"
                      >
                        {(props: FieldProps) =>
                          <SelectField
                            {...props}
                            className={classNames(s.addServices, 'form-input')}
                            selectOptions={selectOptions}
                          />}
                      </Field>
                      <Button
                        className={classNames(s.adding, 'form-submit')}
                        type="submit"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        Добавить
                      </Button>
                    </div>


                    <div className='d-flex'>
                      <Field
                        name="servicesPrice"
                        className={classNames(s.servicesPrice, 'form-input')}
                        placeholder='Цена ₽'
                      />
                      <Field
                        name="additionalExpenses"
                        className={classNames(s.additionalExpenses, 'form-input')}
                        placeholder='Доп.расходы'

                      />

                      <Button
                        className={classNames(s.adding, 'form-submit')}
                        type="submit"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        Добавить
                      </Button>
                    </div>


                    <div className={s.servicesList}>
                      <span className={s.price}>₽ 40</span>
                      <span className={s.info}>Пломбирование</span>
                      <Button color='primary-reverse' onClick={() => false}>
                        <CloseICO />
                      </Button>
                    </div>

                    <div className={s.submitting}>
                      <div className={s.priceBlock}>
                        <span className={s.price}>₽ 370</span>
                        Вся сумма
                      </div>

                      <Button
                        className={classNames(s.submit, 'form-submit')}
                        type="submit"
                        color="secondary"
                        disabled={isSubmitting}
                      >
                        Применить
                      </Button>
                    </div>


                    <Button color='primary-reverse' className={s.delete}>Удалить запись</Button>
                  </>
                )
              }
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
