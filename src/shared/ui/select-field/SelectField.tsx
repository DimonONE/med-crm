import { useState } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import classNames from 'classnames';
import { FieldProps } from 'formik';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import s from './styles.module.scss';

interface MenuItemProps {
  value: string | number
  label: string
}
interface SelectFieldProps extends FieldProps {
  selectOptions: MenuItemProps[]
  className?: string
  iconStart?: React.ReactElement
}

export function SelectField(props: SelectFieldProps) {
  const {
    field,
    selectOptions,
    className,
  } = props;
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={classNames(s.selectField, className)} >
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        className={s.select}
        IconComponent={() => null}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        {...field}
      >
        {selectOptions.map(({ label, value }) => (
          <MenuItem id={`${value}-${label}`} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      <div className='icon-end'>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
    </div>
  );
}