import { useEffect, useState } from 'react';
import { Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import classNames from 'classnames';
import { FieldProps } from 'formik';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import s from './styles.module.scss';

export interface MenuItemProps {
  value: string | number
  label: string
}

type DataProps = FieldProps | {
  value: string | number,
  onChange: (event: SelectChangeEvent<string | number>, child: React.ReactNode) => void
};

type SelectFieldProps = {
  selectOptions: MenuItemProps[]
  children?: JSX.Element[]
  className?: string
  selectNavigate?: boolean
  defaultOption?: string | number
  classNameIcon?: string
} & DataProps;

export function SelectField(props: SelectFieldProps) {
  const [isOpen, setOpen] = useState(false);
  const [selectValue, setValue] = useState<number | string>('');
  const { children, selectOptions, defaultOption, selectNavigate, className, classNameIcon, ...propsSpread } = props;
  const fieldValue = 'field' in propsSpread ? propsSpread.field : propsSpread;

  useEffect(() => {
    if (selectValue) {
      setValue(fieldValue.value);
    } else if (selectValue !== selectOptions[0].value)
      setValue(defaultOption || selectOptions[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, ['field' in propsSpread ? propsSpread.field.value : propsSpread.value]);

  return (
    <div className={classNames(s.selectField, className)} >
      <Select
        sx={{
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
            { border: 0 },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            { border: 0 },
        }}
        {...'field' in propsSpread && propsSpread.field}
        value={selectValue}
        className={classNames('select', s.select)}
        IconComponent={() => null}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        MenuProps={{
          className: classNames({ 'select-navigate': selectNavigate }),
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        }}
        placeholder='test'
        {...propsSpread}
      >
        {
          children || selectOptions.map(({ label, value }) => (
            <MenuItem key={value} id={`${value}`} value={value}
              sx={{ 'display': value === '0' ? 'none' : 'flex' }} >
              {label}
            </MenuItem>
          ))
        }
      </Select>
      <span
        className={classNames('icon-end', classNameIcon)}
        onClick={() => setOpen(prev => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setOpen(prev => !prev);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </span>
    </div>
  );
}