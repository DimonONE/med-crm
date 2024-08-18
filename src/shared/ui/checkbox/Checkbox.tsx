import { ReactElement, useState } from 'react';
import {
  Checkbox as CheckboxUI,
  CheckboxProps,
  FormControlLabel,
} from '@mui/material';
import classNames from 'classnames';
import s from './styles.module.scss';
import BorderCheckedICO from './svg/border-checked-ico.svg';
import CheckedICO from './svg/checked-ico.svg';

interface ICheckbox extends CheckboxProps {
  children?: ReactElement | string;
}

export function Checkbox(props: ICheckbox) {
  const [isChecked, setChecked] = useState(false);
  const { className, children, onChange } = props;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    setChecked(checked);
    if (onChange) {
      onChange(event, checked);
    }
  };

  return (
    <FormControlLabel
      className={classNames(s.root, { [s.checked]: isChecked }, className)}
      control={
        <CheckboxUI
          icon={<BorderCheckedICO />}
          checkedIcon={<CheckedICO />}
          {...props}
          onChange={handleChange}
        />
      }
      label={children}
    />
  );
}
