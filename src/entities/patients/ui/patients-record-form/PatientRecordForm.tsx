import { useMemo, useState } from 'react';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { useDoctors } from '~entities/doctor';
import { Values, WorkDay, WorkTime, daysWork, timesWork } from '~entities/work-time';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import { SelectField } from '~shared/ui/select-field';
import { TimeSelect } from '~shared/ui/time-select';
import { generateTimeList } from '~shared/utils/helpers';
import { useCreateRecord, useDeleteRecord } from '../../api/patientsApi';
import s from './styles.module.scss';

type Props = {
  patientId: string
};

export function PatientRecordForm({ patientId }: Props) {
  const [dateValue, setDateValue] = useState<Dayjs>(dayjs());
  const [timesOptions, setTimesOptions] = useState<{
    value: string;
    label: string;
  }[]>([]);

  const { data: doctors } = useDoctors();
  const { mutate: createMutate } = useCreateRecord();
  const { mutate: deleteMutate } = useDeleteRecord();

  const selectOptions = useMemo(() => {
    const defaultValue = { value: -1, label: 'Имя врача' };
    const doctorsOptions = doctors?.map(({ id, fullName }) => ({
      value: id, label: fullName,
    }));
    return doctorsOptions?.length
      ? [
        defaultValue,
        ...doctorsOptions,
      ]
      : [defaultValue];
  }, [doctors]);


  const onSubmit = async (
    values: Api.CreateRecordDtoDto,
    { setSubmitting }: FormikHelpers<Api.CreateRecordDtoDto>,
  ) => {
    const [startHours, startMinutes] = values.startTime.split(':').map(Number);
    const [endHours, endMinutes] = values.endTime.split(':').map(Number);

    createMutate({
      ...values,
      startTime: dayjs(dateValue).hour(startHours).minute(startMinutes).toISOString(),
      endTime: dayjs(dateValue).hour(endHours).minute(endMinutes).toISOString(),
    }, {
      onSuccess: () => {
        toast('Success!', { type: 'success' });
      },
      onSettled: () => {
        setSubmitting(false);
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  const handleDelete = () => {
    // id с самого списка созданых записей
    deleteMutate('id', {
      onSuccess: () => {
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  const handleActiveTimes = (value: Values[]) => {
    const timesList = generateTimeList(value);
    setTimesOptions(timesList);
  };

  return (
    <Formik
      initialValues={{
        patientId,
        userId: '',
        startTime: '',
        endTime: '',
        notice: '',
        servicePrices: [{}] as Api.CreateServicePriceDtoDto[],
      }}
      validationSchema={object().shape({
        userId: string().required(),
        startTime: string().required(),
        endTime: string().required(),
      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className={classNames(s.container, 'full-width')}>
          <div className={s.label}>Имя врача</div>
          <Field
            name="userId"
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
            Boolean(values.userId) && (
              <>
                <div className={s.label}>График приема</div>
                <div className={s.dateWork}>
                  <DatePicker
                    value={dateValue}
                    className={s.datePicker}
                    onChange={(date) => setDateValue(date)}
                  />
                  <WorkDay className={s.workDay} defaultValue={dateValue} daysWork={daysWork} handleChange={(date) => setDateValue(date)} />
                </div>
                <WorkTime
                  className={s.workTime}
                  personnelId={values.userId}
                  timesWork={timesWork}
                  handleActiveTimes={handleActiveTimes}
                  handleChange={() => false}
                />
                {
                  timesOptions.length ? (
                    <div className={s.times}>
                      <TimeSelect
                        title='Время от'
                        value={values.startTime}
                        onChange={(time) => setFieldValue('startTime', time.value)}
                        selectOptions={timesOptions}
                      />
                      <TimeSelect
                        title='Время до'
                        value={values.endTime}
                        onChange={(time) => setFieldValue('endTime', time.value)}
                        selectOptions={timesOptions}
                      />
                    </div>
                  ) : null
                }

                <fieldset className={classNames(s.complaint, 'full-width')}>
                  <div className={s.label}>Жалоба</div>
                  <Field
                    name="notice"
                    className={classNames(s.complaintField, 'form-textarea')}
                    type="text"
                    placeholder="Заметка"
                    component="textarea"
                  />
                  <ErrorMessage name="notice" />
                </fieldset>

                <div className={s.submitting}>
                  <Button
                    color='primary-reverse'
                    className={s.delete}
                    onClick={() => handleDelete()}
                  >
                    Удалить запись</Button>
                  <Button
                    className={classNames(s.submit, 'form-submit')}
                    type="submit"
                    color="secondary"
                    disabled={isSubmitting}
                  >
                    Применить
                  </Button>
                </div>
              </>
            )
          }
        </Form>
      )}
    </Formik>
  );
}
