import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { TimeTable } from 'react-timetable-events';
import { HourPreviewProps, DayHeaderPreviewProps, Event, EventPreviewProps } from 'react-timetable-events/dist/types';
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


interface RenderEventProps extends EventPreviewProps {
  selectId: string | null
  patientSelect: () => void
}

function createNumberArray(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, index) => index + from);
}

function RenderDayHeader({ day, rowHeight, ...defaultAttributes }: DayHeaderPreviewProps) {
  return (
    <div  {...defaultAttributes} style={{ height: rowHeight }}>
      <div className={s.doctorInfo}>
        {
          day !== 'default' && (
            <>
              <span className={s.name}>Цой Антонионович</span>
              <span className={s.status}>Дантист</span>
            </>
          )
        }
      </div>
    </div >
  );
}

function RenderEvent(eventProps: RenderEventProps) {
  const { event, defaultAttributes, classNames: cn, patientSelect, selectId } = eventProps;

  const currentTime = dayjs();
  const isActive = event.type !== 'default';
  const isPassed = event.type === 'default' && dayjs(event.startTime).isBefore(currentTime);
  return (
    < div
      {...defaultAttributes}
      key={event.id}
      title={event.name}
      className={classNames(defaultAttributes.className, s.patientInfoBlock)}
    >
      <button
        type='button'
        onClick={isActive ? patientSelect : () => undefined}
        className={
          classNames(
            cn.event_info,
            s.patientInfo,
            { [s.active]: isActive },
            { [s.passed]: isPassed },
            { [s.select]: selectId === `${event.userId}---${event.id}` },
          )
        }
      >
        {isActive && (
          <>
            Билл Клинтон Валерьевич
          </>
        )}
      </button>
    </ div >
  );
}

function RenderHour({ hour, ...defaultAttributes }: HourPreviewProps) {
  return (
    <div {...defaultAttributes} key={hour} className={s.time}>
      {hour}
      <div className={s.timeScale} />
    </div>
  );
}

const HOUR_FROM = 5;
const HOUR_TO = 24;

export function AppointmentSchedule({ userId, patientId: initPatientId }: IProps) {
  const navigate = useNavigate();

  const [paidTo, setPaidTo] = useState<Dayjs>(dayjs());
  const [selectId, setSelectId] = useState<string | null>(null);
  const { data, refetch } = useAllRecords(dayjs(paidTo).toISOString(), userId);

  const timesWork = useMemo(() =>
    data?.length && selectId
      ? times.map((timeWork) => {
        const selectDoctorId = selectId.split('---')[0];
        const patientsDoctor = data.filter(({ userId: doctorId }) => doctorId === selectDoctorId);
        const isActiveTime = patientsDoctor.filter(({ startTime }) =>
          dayjs(startTime).hour() === Number(timeWork.time.split(':')[0]));
        return isActiveTime?.length ? { ...timeWork, isActive: true } : timeWork;
      },
      )
      : [], [data, selectId]);

  const doctors = useMemo(() => {
    const doctorsByUserId = !data?.length
      ? {
        'default': [{
          id: 0,
          type: 'default',
          name: '',
          startTime: new Date(),
          endTime: new Date(),
        }],
      }
      : data.reduce((acc, current) => {
        const { userId: id } = current;
        const numbersArray = createNumberArray(HOUR_FROM, HOUR_TO);

        if (!acc[id]) {
          acc[id] = [];

          numbersArray.forEach((hour) => {
            const startTime = new Date();
            const endTime = new Date();
            startTime.setHours(hour, 0, 0, 0);
            endTime.setHours(hour + 1, 0, 0, 0);

            return acc[id].push({
              id: `${hour}-default`,
              type: 'default',
              name: '',
              startTime,
              endTime,
            });
          });
        }
        acc[id].push({
          ...current,
          type: 'custom',
          name: current.userId,
          startTime: new Date(current.startTime),
          endTime: new Date(current.endTime),
        });
        return acc;
      }, {} as { [key: string]: Event[] });
    return doctorsByUserId;
  }, [data]);

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
        <div className={s.container}>
          <TimeTable
            // @ts-ignore
            timeLabel={<TimeICO />}
            events={doctors}
            renderDayHeader={RenderDayHeader}
            renderHour={RenderHour}
            renderEvent={(eventProps) =>
              <RenderEvent
                selectId={selectId}
                patientSelect={() => patientSelect(
                  `${eventProps.event.userId}---${eventProps.event.id}`,
                  eventProps.event.patientId as string,
                )}
                {...eventProps}
              />}
            hoursInterval={{ from: HOUR_FROM, to: HOUR_TO }}
            style={{ height: '2000px', width: 'max-content' }}
            headerAttributes={{ className: s.header }}
            bodyAttributes={{ className: s.bodyAttributes }}
          />
        </div>
      </div>
    </div >
  );
}

