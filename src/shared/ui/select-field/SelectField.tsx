import { useEffect, useState } from 'react';
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
  const [selectValue, setValue] = useState<number | string>('');

  useEffect(() => {
    if (selectValue) {
      setValue(field.value);
    } else
      setValue(selectOptions[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  return (
    <div className={classNames(s.selectField, className)} >
      <Select
        {...field}
        value={selectValue}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        className={classNames('select', s.select)}
        IconComponent={() => null}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        {selectOptions.map(({ label, value }) => (
          <MenuItem id={`${value}`} value={value} className={s.testss}>
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