import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { SelectField } from '~shared/ui/select-field';
import { getNavigateList } from '../../lib';
import { useRoleUser } from '../../model/sessionModel';

export function NavigateButton() {
  const { checkUserRole } = useRoleUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const selectOptions = getNavigateList(checkUserRole);


  useEffect(() => {
    if (selectOptions.length) {
      const isOption = selectOptions.find((option) => option.value === location.pathname);
      if (isOption !== undefined) {
        setValue(isOption.value);
      } else
        setValue(selectOptions[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!selectOptions.length) return null;

  return (
    <SelectField
      value={value}
      onChange={(event) => typeof event.target.value === 'string' && setValue(event.target.value)}
      className='form-input buttons-header'
      selectNavigate
      selectOptions={selectOptions}
    >
      {
        selectOptions.map(({ label, value: link }) => (
          <MenuItem
            key={link}
            value={link}
            className='select-link'
            onClick={() => navigate(link)}
          >
            {label}
          </MenuItem>
        ))
      }
    </SelectField>
  );
}
