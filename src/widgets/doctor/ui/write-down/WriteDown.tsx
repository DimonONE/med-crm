import { useState } from 'react';
import { MenuItem } from '@mui/material';
import classNames from 'classnames';
import { WorkDay, WorkTime } from '~entities/work-time';
import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import { SelectField } from '~shared/ui/select-field';
import s from './styles.module.scss';

type IProps = {
  patientId: string
};

export function WriteDown({ patientId }: IProps) {

  const [, setPaidTo] = useState('11/12/2023');

  const [value, setValue] = useState('');
  const selectOptions = [{ value: 1, label: 'Имя врача' }];

  return (
    <div className={s.root}>
      <BackButton link={PATH_PAGE.doctor.patient(patientId)} title='Записать' />

      <SelectField
        value={value}
        onChange={(event) => setValue(event.target.value)}
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
        <WorkDay className={s.workDay} />
      </div>
      <WorkTime />

      <div className={s.times}>
        <div className={s.time}>
          <span className={s.label}>Время от</span>
          <SelectField
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={classNames('form-input', s.selectTime)}
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
        </div>

        <div className={s.time}>
          <span className={s.label}>Время до</span>
          <SelectField
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={classNames('form-input', s.selectTime)}
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

        </div>
      </div>
      <Button type='submit' className={s.writeButton}>Записать</Button>
    </div>
  );
}
