import { useState } from 'react';
import { MenuItem } from '@mui/material';
import classNames from 'classnames';
import { SelectField } from '../select-field';
import s from './styles.module.scss';

interface TimeSelectProps {
  title?: string
  selectOptions: { value: string | number, label: string }[]
  className?: string
}

export function TimeSelect({ title, selectOptions, className }: TimeSelectProps) {
  const [value, setValue] = useState<string | number>('');

  return (
    <div className={classNames(s.root, className)}>
      <span className={s.label}>{title}</span>
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
            >
              {label}
            </MenuItem>
          ))
        }
      </SelectField>
    </div>
  );
}
