import { useEffect, useState } from 'react';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import classNames from 'classnames';
import { FieldProps } from 'formik';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import s from './styles.module.scss';

interface MenuItemProps {
  value: string | number
  label: string
}

type DataProps = FieldProps | {
  value: string,
  onChange: (event: any) => void
};

type SelectFieldProps = {
  selectOptions: MenuItemProps[]
  children?: JSX.Element[]
  className?: string
  selectNavigate?: boolean
} & DataProps;

export function SelectField(props: SelectFieldProps) {
  const [isOpen, setOpen] = useState(false);
  const [selectValue, setValue] = useState<number | string>('');
  const { children, selectOptions, selectNavigate, className, ...propsSpread } = props;
  const fieldValue = 'field' in propsSpread ? propsSpread.field : propsSpread;

  useEffect(() => {
    if (selectValue) {
      setValue(fieldValue.value);
    } else if (selectValue !== selectOptions[0].value)
      setValue(selectOptions[0].value);
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
        {...propsSpread}
      >
        {
          children || selectOptions.map(({ label, value }) => (
            <MenuItem key={value} id={`${value}`} value={value}>
              {label}
            </MenuItem>
          ))
        }
      </Select>
      <div className='icon-end'>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
    </div>
  );
}