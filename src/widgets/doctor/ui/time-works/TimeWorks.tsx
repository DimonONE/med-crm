import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { WorkDay, WorkTime, daysWork, timesWork } from '~entities/work-time';
import { DatePicker } from '~shared/ui/date-picker';
import s from './styles.module.scss';

export function TimeWorks() {
  const [paidTo, setPaidTo] = useState<Dayjs>(dayjs());

  return (
    <div className={s.root}>
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
  );
}
