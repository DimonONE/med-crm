
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { object } from 'yup';
import { WorkDay, WorkTime, daysWork, timesWork } from '~entities/work-time';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import s from './styles.module.scss';

export function Schedule() {

  return (
    <div className={s.root}>
      <BackButton title='Посещаемость, расписание' />
      <div className={s.formContainer}>
        <Formik
          initialValues={{
            dayWork: 0,
            timeWork: '',
            startVacation: '',
            endVacation: '',
          }}
          validationSchema={object().shape({
            // startVacation: string().required(),
            // endVacation: string().required(),
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
          {({ isSubmitting, setValues }) => (
            <Form >
              <div className={s.label}>Имя</div>
              <div className={s.name}>Винницкий Богдан Станиславович</div>

              <div className={s.label}>Выберите дни работы</div>
              <WorkDay
                daysWork={daysWork}
                handleChange={(date) => setValues(prev => ({ ...prev, dayWork: dayjs(date).day() }))}
                className={s.workDay} />

              <div className={s.workTimeBlock}>
                <div className={s.label}>Выберите время работы</div>
                <WorkTime
                  editTimes
                  timesWork={timesWork}
                  handleChange={(timeInfo) => setValues(prev => ({ ...prev, timeWork: timeInfo.time }))}
                  handleDelete={() => false}
                />

                <div className={s.textHelper}>
                  *Перетащите мышкой от нужного до нужного времени или накликайте левой кнопкой мышки по часам работы сотрудника
                </div>
              </div>

              <div className={s.label}>Выберите отпуск</div>
              <div className={s.datePickerBlock}>
                От
                <DatePicker sx={{
                  '.MuiInputBase-root.MuiOutlinedInput-root': {
                    width: '170px',
                    height: '38px',
                    padding: '0 14px',
                    maxWidth: 'none',
                    background: '#FFF',
                    borderRadius: '10.104px',
                    border: '1.123px solid #A1B6C1',
                    marginRight: '20px',
                    fontSize: '18px',
                    color: '#A1B6C1',
                  },
                  '.MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root': {
                    color: '#A1B6C1',
                  },
                  '.MuiButtonBase-root': {
                    padding: 0,
                    paddingRight: '5px',
                  },
                }}
                  onChange={(time) => setValues(prev => ({ ...prev, startVacation: dayjs(time).toString() }))}
                />

                До
                <DatePicker sx={{
                  '.MuiInputBase-root.MuiOutlinedInput-root': {
                    width: '170px',
                    height: '38px',
                    padding: '0 14px',
                    maxWidth: 'none',
                    background: '#FFF',
                    borderRadius: '10.104px',
                    border: '1.123px solid #A1B6C1',

                    fontSize: '18px',
                    color: '#A1B6C1',
                  },
                  '.MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root': {
                    color: '#A1B6C1',
                  },
                  '.MuiButtonBase-root': {
                    padding: 0,
                    paddingRight: '5px',
                  },
                }}
                  onChange={(time) => setValues(prev => ({ ...prev, endVacation: dayjs(time).toString() }))}
                />
              </div>

              <Button
                className={classNames(s.submit, 'form-submit')}
                type="submit"
                color="primary"
              >
                Сохранить {isSubmitting}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
