import { useState } from 'react';
import { MenuItem } from '@mui/material';
import classNames from 'classnames';
import { Dayjs } from 'dayjs';
import { WorkDay, WorkTime, daysWork, timesWork } from '~entities/work-time';
import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import { SelectField } from '~shared/ui/select-field';
import { TimeSelect, TimeSelectOption } from '~shared/ui/time-select';
import s from './styles.module.scss';

type TimesSelect = {
  startTime: TimeSelectOption | null,
  endTime: TimeSelectOption | null,
};

type IProps = {
  patientId: string
};

export function WriteDown({ patientId }: IProps) {
  const [, setPaidTo] = useState<Dayjs | null>(null);
  const [timesSelect, setTimesSelect] = useState<TimesSelect>({
    startTime: null,
    endTime: null,
  });

  const [value, setValue] = useState<string>('');
  const selectOptions = [{ value: '1', label: 'Имя врача' }];

  return (
    <div className={s.root}>
      <BackButton link={PATH_PAGE.doctor.patient(patientId)} title='Записать' />

      <SelectField
        value={value}
        onChange={(event) => typeof event.target.value === 'string' && setValue(event.target.value)}
        className={classNames('form-input', s.selectDoctor)}
        selectNavigate
        selectOptions={selectOptions}
      >
        {
          selectOptions.map(({ label, value: link }) => (
            <MenuItem
              key={link}
              value={link}
              className='select-link'
              onClick={() => false}
            >
              {label}
            </MenuItem>
          ))
        }
      </SelectField>

      <div className='d-flex'>
        <DatePicker
          className={s.datePicker}
          onChange={(event) => event && setPaidTo(event)}
        />
        <WorkDay daysWork={daysWork} handleChange={() => false} className={s.workDay} />
      </div>
      <WorkTime editTimes timesWork={timesWork} handleChange={() => false} />
      <div className={s.times}>
        <TimeSelect
          title='Время от'
          value={timesSelect.startTime?.value}
          onChange={(time) => setTimesSelect(prev => ({ ...prev, startTime: time }))}
          selectOptions={selectOptions}
        />
        <TimeSelect
          title='Время до'
          value={timesSelect.endTime?.value}
          onChange={(time) => setTimesSelect(prev => ({ ...prev, endTime: time }))}
          selectOptions={selectOptions}
        />
      </div>
      <Button type='submit' className={s.writeButton}>Записать</Button>
    </div>
  );
}
