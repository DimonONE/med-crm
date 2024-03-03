import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useAllRecords } from '~entities/doctor';
import { WorkDay, WorkTime, daysWork, timesWork as times } from '~entities/work-time';
import { PATH_PAGE } from '~shared/lib/react-router';
import TimeICO from '~shared/svg/time-ico.svg';
import { DatePicker } from '~shared/ui/date-picker';
import s from './styles.module.scss';

type IProps = {
  userId: string
  patientId?: string;
};

function calculateInterval(time: string): number {
  const dateTime = dayjs(time);
  const minutes = dateTime.minute();

  switch (true) {
    case minutes <= 15:
      return 25;
    case minutes <= 30:
      return 50;
    case minutes <= 45:
      return 75;
    default:
      return 100;
  }
}

export function AppointmentSchedule({ userId, patientId: initPatientId }: IProps) {
  const navigate = useNavigate();

  const [paidTo, setPaidTo] = useState<Dayjs>(dayjs());
  const [selectId, setSelectId] = useState<string | null>(null);

  const { data, refetch } = useAllRecords(dayjs(paidTo).toISOString(), userId);
  console.log('AppointmentSchedule', data);

  const timesWork = useMemo(() =>
    data?.length && selectId
      ? times.map((timeWork) => {
        const selectDoctorId = selectId.split('---')[0];
        const patientsDoctor = data.filter(({ userId: doctorId }) => doctorId === selectDoctorId);
        const isActiveTime = patientsDoctor.filter(({ startTime }) =>
          dayjs(startTime).hour() === Number(timeWork.time.split(':')[0]));
        console.log('isActiveTime', isActiveTime);

        return isActiveTime?.length ? { ...timeWork, isActive: true } : timeWork;
      },
      )
      : [], [data, selectId]);

  const patientSelect = (id: string, patientId: string) => {
    const link = selectId === id ? PATH_PAGE.doctor.root : PATH_PAGE.doctor.patient(patientId);
    setSelectId((prev) => prev === id ? null : id);
    navigate(link);
  };

  useEffect(() => {
    if (!initPatientId) {
      setSelectId(null);
    }
  }, [initPatientId]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paidTo]);

  return (
    <div className={s.root}>
      <div className={s.filters}>
        <div className='d-flex'>
          <DatePicker
            value={paidTo}
            className={s.datePicker}
            onChange={(event) => event && setPaidTo(event as Dayjs)}
          />
          <WorkDay defaultValue={paidTo} daysWork={daysWork} handleChange={(date) => setPaidTo(date)} className={s.workDay} />
          <button type='button' className={s.presentDay} onClick={() => setPaidTo(dayjs())}>Сегодня</button>
          <button type='button' className={s.nextDay} onClick={() => setPaidTo(dayjs().add(1, 'day'))}>Завтра</button>
        </div>
        <WorkTime timesWork={timesWork} handleChange={() => false} />
      </div>

      <div className={s.schedule}>
        <div className={s.header}>
          <div className={s.time}>
            <TimeICO />
          </div>
          {
            data?.map(({ id }) => (
              <div key={id} className={s.doctorInfo}>
                <span className={s.name}>Цой Антонионович</span>
                <span className={s.status}>Дантист</span>
              </div>
            ))
          }
        </div>
        <div className={s.container}>
          {
            times.map(({ id, time }) => (
              <div key={id} className='d-flex'>
                <div className={s.time}>
                  {time}
                  <div className={s.timeScale} />
                </div>
                {
                  data?.map(({ id: recordId, patientId, userId: doctorId, startTime, endTime }) => (
                    <div
                      className={classNames(
                        s.patientInfo,
                        // { [s.active]: false },
                        { [s.passed]: true },
                        { [s.select]: selectId === `${doctorId}---${time}` },
                      )}>
                      {
                        dayjs(startTime).hour() === Number(time.split(':')[0]) && (
                          <button
                            key={recordId}
                            type='button'
                            onClick={() => patientSelect(`${doctorId}---${time}`, patientId)}

                          >
                            <div className={s.active} style={{
                              height: `${calculateInterval(endTime)}%`,
                            }} >
                              Билл Клинтон Валерьевич
                            </div>
                          </button>
                        )
                      }
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
