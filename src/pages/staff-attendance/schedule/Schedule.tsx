
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Form, Formik, FormikHelpers } from 'formik';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object } from 'yup';
import { attendanceApi } from '~entities/staffAttendance';
import { WorkDay, WorkTime, daysWork, timesWork } from '~entities/work-time';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { VacationForm } from '~widgets/staff-attendance';
import s from './styles.module.scss';

type Params = {
  userId: string
};

type DayType = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export function Schedule() {
  const { userId } = useParams<Params>();
  const { mutate } = attendanceApi.useCreateWorkTime();

  const onSubmit = async (
    values: Api.CreateUpdateWorkTimeDtoDto,
    { setSubmitting, resetForm }: FormikHelpers<Api.CreateUpdateWorkTimeDtoDto>,
  ) => {
    try {
      await mutate(values, {
        onSuccess: () => {
          toast('Success!', { type: 'success' });
          resetForm();
        },
        onError: (error) => {
          toast(errorHandler(error), { type: 'error' });
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={s.root}>
      <BackButton title='Посещаемость, расписание' />
      <div className={s.formContainer}>
        <Formik
          initialValues={{
            userId: userId!,
            dayOfWeek: 'Sunday',
            times: [],
          }}
          validationSchema={object().shape({
            // startVacation: string().required(),
            // endVacation: string().required(),
          })}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setValues }) => (
            <Form >
              <div className={s.label}>Имя</div>
              <div className={s.name}>Винницкий Богдан Станиславович</div>

              <div className={s.label}>Выберите дни работы</div>
              <WorkDay
                daysWork={daysWork}
                handleChange={(date) => setValues(prev => ({ ...prev, dayOfWeek: dayjs(date).format('dddd') as DayType }))}
                className={s.workDay} />

              <div className={s.workTimeBlock}>
                <div className={s.label}>Выберите время работы</div>
                <WorkTime
                  editTimes
                  timesWork={timesWork}
                  handleChange={(times) => setValues(prev => ({
                    ...prev,
                    times,
                  }))}
                  handleDelete={() => false}
                />

                <div className={s.textHelper}>
                  *Перетащите мышкой от нужного до нужного времени или накликайте левой кнопкой мышки по часам работы сотрудника
                </div>
                <Button
                  className={classNames(s.submit, 'form-submit')}
                  type="submit"
                  color="primary"
                >
                  Сохранить {isSubmitting}
                </Button>
              </div>


            </Form>
          )}
        </Formik>

        <VacationForm userId={userId!} />
      </div>
    </div >
  );
}
