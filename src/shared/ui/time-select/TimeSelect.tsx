import { useEffect } from 'react';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import classNames from 'classnames';
import { SelectField } from '../select-field';
import s from './styles.module.scss';

export type TimeSelectOption = {
  value: string | number,
  label: string
};

interface TimeSelectProps {
  title?: string
  value: string | number | undefined
  onChange: (value: TimeSelectOption) => void
  selectOptions: TimeSelectOption[]
  className?: string
}

export function TimeSelect(props: TimeSelectProps) {
  const { title, selectOptions, value, onChange, className } = props;

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    const selectTime = selectOptions.find(({ value: valueId }) => valueId === event.target.value);
    if (selectTime)
      onChange(selectTime);
  };

  useEffect(() => {
    onChange(selectOptions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className={classNames(s.root, className)}>
      <span className={s.label}>{title}</span>
      <SelectField
        value={value ?? 0}
        onChange={handleChange}
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
