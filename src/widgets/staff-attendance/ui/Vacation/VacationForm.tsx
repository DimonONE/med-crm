import classNames from 'classnames';
import dayjs from 'dayjs';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { attendanceApi } from '~entities/staffAttendance';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import s from './styles.module.scss';

type Props = {
  userId: string
};

export function VacationForm({ userId }: Props) {
  const { mutate } = attendanceApi.useCreateVacation();

  const onSubmit = async (
    values: Api.CreateVacationDtoDto,
    { setSubmitting }: FormikHelpers<Api.CreateVacationDtoDto>,
  ) => {
    try {
      await mutate(values, {
        onSuccess: () => {
          toast('Success!', { type: 'success' });
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
    <Formik
      initialValues={{
        userId,
        startDate: '',
        endDate: '',
      }}
      validationSchema={object().shape({
        startDate: string().required(),
        endDate: string().required(),
      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setValues }) => (
        <Form >
          <div className={s.vacationTime}>
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
                onChange={(time) => setValues(prev => ({ ...prev, startDate: dayjs(time).toString() }))}
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
                onChange={(time) => setValues(prev => ({ ...prev, endDate: dayjs(time).toString() }))}
              />
              <Button
                className={classNames(s.submit, 'form-submit')}
                type="submit"
                color="primary"
              >
                Сохранить {isSubmitting}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
