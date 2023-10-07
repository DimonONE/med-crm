import { useState } from 'react';
import classNames from 'classnames';
import ArrowLeftICO from '~shared/svg/arrow-left-ico.svg';
import ArrowRightICO from '~shared/svg/arrow-right-ico.svg';
import s from './styles.module.scss';

type IProps = {
  className?: string
};


export function WorkDay({ className }: IProps) {
  const [activeId, setActiveId] = useState(1);
  const daysWork = [
    {
      id: 1,
      time: 'ПН',
      isActive: false,
    },
    {
      id: 2,
      time: 'ВТ',
      isWork: false,
    },
    {
      id: 3,
      time: 'СР',
      isWork: true,
    },
    {
      id: 4,
      time: 'ЧТ',
      isWork: false,
    },
    {
      id: 5,
      time: 'ПТ',
      isWork: false,
    },
    {
      id: 6,
      time: 'СБ',
      isWork: false,
    },
    {
      id: 7,
      time: 'ВС',
      isWork: false,
    },
  ];

  const handleClick = (skip: 'prev' | 'next', arrayLength: number) => {
    let skipped: number;

    if (skip === 'next') {
      skipped = arrayLength < activeId + 1 ? 1 : activeId + 1;
    } else {
      skipped = activeId - 1 < 1 ? arrayLength : activeId - 1;
    }
    setActiveId(skipped);
  };

  return (
    <div className={classNames(s.root, className)}>
      <span tabIndex={0} role='button' onClick={() => handleClick('prev', daysWork.length)} onKeyDown={() => { }} className={s.arrowLeft}>
        <ArrowLeftICO />
      </span>
      {daysWork.map(({ id, time }) => (
        <button key={id} type='button' className={classNames(s.day, { [s.active]: activeId === id })}>{time}</button>
      ))}
      <span tabIndex={0} role='button' onClick={() => handleClick('next', daysWork.length)} onKeyDown={() => { }} className={s.arrowRight}>
        <ArrowRightICO />
      </span>
    </div>
  );
}
