import { useState } from 'react';
import { WorkDay, WorkTime } from '~entities/work-time';
import { DatePicker } from '~shared/ui/date-picker';
import s from './styles.module.scss';

export function TimeWorks() {
  const [, setPaidTo] = useState('11/12/2023');

  return (
    <div className={s.root}>
      <div className='d-flex'>
        <DatePicker
          className={s.datePicker}
          onChange={(event) => event && setPaidTo(event)}
        />
        <WorkDay className={s.workDay} />
        <button type='button' className={s.presentDay}>Сегодня</button>
        <button type='button' className={s.nextDay}>Завтра</button>
      </div>
      <WorkTime />
    </div>
  );
}
