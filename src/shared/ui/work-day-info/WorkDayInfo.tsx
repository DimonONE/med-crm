import { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Api } from '~shared/api/realworld';
import { TimeScale, getTodayAtSpecificHour } from '../time-scale';
import s from './styles.module.scss';

type WorkDayInfoProps = {
  id: string
  vacations: Api.UserVacationEntityDto[]
  workTimes: Api.UserWorkTimeEntityDto[]
  defaultTimeValue: Api.TimesDtoDto[]
  handleChange: (data: Api.TimesDtoDto[]) => void
};

export function WorkDayInfo({ id, vacations, workTimes, defaultTimeValue, handleChange }: WorkDayInfoProps) {
  const [firstLoad, setFirstLoad] = useState(true);
  const isVacation = vacations.find((vacation) => dayjs().isBetween(dayjs(vacation.startTime), dayjs(vacation.endTime), null, '[]'));
  const dayOfWeek = workTimes.filter((workTime) => workTime.dayOfWeek === dayjs().format('dddd'));
  const dayOff = dayOfWeek.length === 0;

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  if (isVacation) {
    const startDate = dayjs(isVacation.startTime).format('DD.MM.YYYY');
    const endDate = dayjs(isVacation.endTime).format('DD.MM.YYYY');
    return <div className={classNames(s.dayOff, s.vacations)}>{`ОТПУСК: ${startDate} - ${endDate}`}</div>;
  }

  if (dayOff) {
    return <div className={s.dayOff}>ВЫХОДНОЙ</div >;
  }

  const onChange = (data: Api.TimesDtoDto[]) => {
    if (firstLoad || defaultTimeValue.length === data.length) {
      return;
    }
    handleChange(data);
  };

  return (
    <TimeScale
      id={id}
      defaultTimeValue={defaultTimeValue}
      startTime={getTodayAtSpecificHour(9)}
      endTime={getTodayAtSpecificHour(20)}
      workTimes={dayOfWeek}
      handleChange={onChange}
    />
  );
}
