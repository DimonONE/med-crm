import { useEffect, useState } from 'react';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import classNames from 'classnames';
import { SelectField } from '../select-field';
import s from './styles.module.scss';

type SelectOption = {
  value: string | number,
  label: string
};

interface TimeSelectProps {
  title?: string
  selectOptions: SelectOption[]
  className?: string
  handleChange?: (value: SelectOption) => void
}

export function TimeSelect(props: TimeSelectProps) {
  const [value, setValue] = useState<string | number>('');

  const { title, selectOptions, handleChange, className } = props;

  const onChange = (event: SelectChangeEvent<string | number>) => {
    setValue(event.target.value);

    if (handleChange) handleChange(selectOptions[0]);
  };

  useEffect(() => {
    setValue(selectOptions[0].value);
    if (handleChange) handleChange(selectOptions[0]);
  }, [selectOptions]);


  return (
    <div className={classNames(s.root, className)}>
      <span className={s.label}>{title}</span>
      <SelectField
        value={value}
        onChange={onChange}
        className={classNames('form-input', s.selectTime)}
        selectNavigate
        defaultOption={selectOptions[0].label}
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
