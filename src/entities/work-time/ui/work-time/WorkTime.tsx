import { useState } from 'react';
import classNames from 'classnames';
import ArrowLeftICO from '~shared/svg/arrow-left-ico.svg';
import ArrowRightICO from '~shared/svg/arrow-right-ico.svg';
import CloseICO from '~shared/svg/close-gray-ico.svg';
import { Button } from '~shared/ui/button';
import { TimeScale, getTodayAtSpecificHour } from '~shared/ui/time-scale';
import s from './styles.module.scss';

type Values = {
  id: string | number,
  time: string,
  isWork: boolean
};

type IProps = {
  timesWork: Values[]
  handleChange: (values: Values) => void
  handleDelete?: (id: string | number) => void
  editTimes?: boolean
  className?: string
};

export function WorkTime(props: IProps) {
  const { className, editTimes, timesWork, handleChange, handleDelete } = props;

  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const handleTime = (values: Values) => {
    // Если режим редактирования активен, добавьте или удалите выбранный временной диапазон
    if (editTimes) {
      const index = selectedTimes.indexOf(values.id.toString());
      console.log('index', index);

      if (index === -1) {
        setSelectedTimes([...selectedTimes, values.id.toString()]);
      } else {
        setSelectedTimes(selectedTimes.filter(id => id !== values.id));
      }
    }
    // Ваша логика обработки времени
    handleChange(values);
  };

  return (
    <div className={classNames(s.root, className)}>
      <span tabIndex={0} role='button' onClick={() => { }} onKeyDown={() => { }} className={s.arrowLeft}>
        <ArrowLeftICO />
      </span>
      {
        editTimes ? (
          <TimeScale startTime={getTodayAtSpecificHour(9)} endTime={getTodayAtSpecificHour(21)} />
        ) : (
          <div className={s.times}>
            {timesWork.map(({ id, time, isWork }) => (
              <div
                key={id}
                className={classNames(s.timeBlock, {
                  [s.timeWork]: !editTimes && isWork,
                  [s.selected]: editTimes && selectedTimes.includes(id.toString()),
                })}
              >
                <button type='button' className={s.time} onClick={() => handleTime({ id, time, isWork })}>{time}</button>
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

      <span tabIndex={0} role='button' onClick={() => { }} onKeyDown={() => { }} className={s.arrowRight}>
        <ArrowRightICO />
      </span>
    </div>
  );
}


