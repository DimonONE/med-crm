import classNames from 'classnames';
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { object } from 'yup';
import { WorkDay, WorkTime, daysWork, timesWork } from '~entities/work-time';
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
  const { mutate: createMutate } = useCreateRecord();
  const { mutate: deleteMutate } = useDeleteRecord();

  const selectOptions = [{ value: '0', label: 'Имя врача' }, { value: '1', label: 'Dima' }, { value: '2', label: 'Ivan' }];
  const timesOptions = generateTimeList();

  const onSubmit = async (
    values: Api.CreateRecordDtoDto,
    { setSubmitting }: FormikHelpers<Api.CreateRecordDtoDto>,
  ) => {
    createMutate(values, {
      onSuccess: (response) => {
        console.log('response', response);
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
    deleteMutate(patientId, {
      onSuccess: (response) => {
        console.log('response', response);
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  return (
    <Formik
      initialValues={{
        patientId: 'f6c52af2-87f5-4243-8f80-9dc80f11c8e9',
        startTime: '2024-02-12T21:17:28.917Z',
        userId: '',
        endTime: '2024-02-12T21:17:28.917Z',
        notice: '',
        servicePrices: [
          {},
        ],
      }}
      validationSchema={object().shape({
        // fullName: string().min(5).required(),
        // email: string().email().required(),
      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values }) => (
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
                    className={s.datePicker}
                    onChange={() => false}
                  />
                  <WorkDay daysWork={daysWork} handleChange={() => false} className={s.workDay} />
                </div>
                <WorkTime className={s.workTime} timesWork={timesWork} handleChange={() => false} />

                <div className={s.times}>
                  <TimeSelect title='Время от' selectOptions={timesOptions} />
                  <TimeSelect title='Время до' selectOptions={timesOptions} />
                </div>

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
