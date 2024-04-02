import { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import ArrowLeftICO from '~shared/svg/arrow-left-ico.svg';
import ArrowRightICO from '~shared/svg/arrow-right-ico.svg';
import s from './styles.module.scss';

type DayWork = {
  id: number
  day: string
};

type IProps = {
  daysWork: DayWork[]
  handleChange: (date: Dayjs) => void
  defaultValue?: Dayjs
  className?: string
};

export function WorkDay({ daysWork, defaultValue = dayjs(), handleChange, className }: IProps) {

  const [activeId, setActiveId] = useState<number>(dayjs(defaultValue).day());

  const handleSkipped = (skip: 'prev' | 'next', arrayLength: number) => {
    let skipped: number;

    if (skip === 'next') {
      skipped = arrayLength < activeId + 1 ? 1 : activeId + 1;
    } else {
      skipped = ((activeId - 1 < 1) && activeId - 1 !== -1) ? 0 : activeId - 1;
    }
    setActiveId(skipped);
    handleChange(dayjs(defaultValue).day(skipped));
  };

  const handleClick = (id: number) => {
    const newDay = id === 0 ? 7 : id;
    setActiveId(id);
    handleChange(dayjs(defaultValue).day(newDay));
  };

  useEffect(() => {
    setActiveId(dayjs(defaultValue).day());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className={classNames(s.root, className)}>
      <span tabIndex={0}
        role='button'
        onClick={() => handleSkipped('prev', daysWork.length)}
        onKeyDown={() => { }}
        className={s.arrowLeft}>
        <ArrowLeftICO />
      </span>
      {daysWork.map(({ id, day }) => (
        <button
          key={id}
          type='button'
          className={classNames(s.day, { [s.active]: activeId === id })}
          onClick={() => handleClick(id)}
        >
          {day}
        </button>
      ))}
      <span
        tabIndex={0}
        role='button'
        onClick={() => handleSkipped('next', daysWork.length)}
        onKeyDown={() => { }}
        className={s.arrowRight}>
        <ArrowRightICO />
      </span>
    </div>
  );
}
