import { useState } from 'react';
import classNames from 'classnames';
import ArrowLeftICO from '~shared/svg/arrow-left-ico.svg';
import ArrowRightICO from '~shared/svg/arrow-right-ico.svg';
import s from './styles.module.scss';

type DayWork = {
  id: number
  day: string
};

type IProps = {
  daysWork: DayWork[]
  handleChange: (activeId: number) => void
  className?: string
};

export function WorkDay({ daysWork, handleChange, className }: IProps) {
  const [activeId, setActiveId] = useState<number>(1);


  const handleSkipped = (skip: 'prev' | 'next', arrayLength: number) => {
    let skipped: number;

    if (skip === 'next') {
      skipped = arrayLength < activeId + 1 ? 1 : activeId + 1;
    } else {
      skipped = activeId - 1 < 1 ? arrayLength : activeId - 1;
    }
    setActiveId(skipped);
    handleChange(skipped);
  };

  const handleClick = (id: number) => {
    setActiveId(id);
    handleChange(id);
  };

  return (
    <div className={classNames(s.root, className)}>
      <span tabIndex={0} role='button' onClick={() => handleSkipped('prev', daysWork.length)} onKeyDown={() => { }} className={s.arrowLeft}>
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
      <span tabIndex={0} role='button' onClick={() => handleSkipped('next', daysWork.length)} onKeyDown={() => { }} className={s.arrowRight}>
        <ArrowRightICO />
      </span>
    </div>
  );
}
