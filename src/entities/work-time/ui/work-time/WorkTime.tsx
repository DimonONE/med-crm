import { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { sessionApi } from '~entities/session';
import { Api } from '~shared/api/realworld';
import CloseICO from '~shared/svg/close-gray-ico.svg';
import { Button } from '~shared/ui/button';
import { TimeScale, getTodayAtSpecificHour } from '~shared/ui/time-scale';
import s from './styles.module.scss';

export type Values = {
  id: string | number,
  time: string,
  isActive: boolean
};

type IProps = {
  timesWork: Values[]
  handleActiveTimes?: (value: Values[]) => void
  handleChange?: (values: Api.TimesDtoDto[]) => void
  handleDelete?: (id: string | number) => void
  personnelId?: string
  editTimes?: boolean
  className?: string
};

export function WorkTime(props: IProps) {
  const { className, editTimes, personnelId, timesWork: times, handleActiveTimes, handleChange, handleDelete } = props;
  const { data } = sessionApi.useGetUserId(personnelId || '', { enabled: !!personnelId });

  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const timesWork = useMemo(() => times.map((time) => {
    const timeSplit = time.time.split(':');
    const hour = Number(timeSplit[0]);
    const minute = Number(timeSplit[1]);
    const timeChange = dayjs().set('hour', hour).set('minute', minute);
    const dayOfWeek = data?.workTimes.filter((workTime) => workTime.dayOfWeek === dayjs().format('dddd'));
    const isActive = dayOfWeek?.filter(({ startTime, endTime }) => timeChange.isBetween(startTime, endTime, null, '[]')).length !== 0;

    return {
      ...time,
      isActive,
    };
  }), [times, data]);

  const handleTime = (values: Values) => {
    if (editTimes) {
      const index = selectedTimes.indexOf(values.id.toString());

      if (index === -1) {
        setSelectedTimes([...selectedTimes, values.id.toString()]);
      } else {
        setSelectedTimes(selectedTimes.filter(id => id !== values.id));
      }
    }
  };

  useEffect(() => {
    if (handleActiveTimes) {
      const timesWorkActive = timesWork.filter(({ isActive }) => isActive);
      handleActiveTimes(timesWorkActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timesWork]);

  return (
    <div className={classNames(s.root, className)}>
      {
        editTimes && handleChange ? (
          <TimeScale id='time-work-1' startTime={getTodayAtSpecificHour(9)} endTime={getTodayAtSpecificHour(21)}
            handleChange={handleChange} />
        ) : (
          <div className={s.times}>
            {timesWork.map(({ id, time, isActive }) => (
              <div
                key={id}
                className={classNames(s.timeBlock, {
                  [s.timeWork]: !editTimes && isActive,
                  [s.selected]: editTimes && selectedTimes.includes(id.toString()),
                })}
              >
                <button type='button' className={s.time} onClick={() => handleTime({ id, time, isActive })}>{time}</button>
                {
                  editTimes && handleDelete && (
                    <Button
                      color='primary-reverse'
                      type='button'
                      className={s.delete}
                      onClick={() => handleDelete(id)}
                    ><CloseICO /></Button>
                  )
                }
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}


