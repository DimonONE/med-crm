// import { useQueryClient } from '@tanstack/react-query';
// import { Button } from '~shared/ui/button';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoleEnum } from '~shared/lib/react-router';
import { SelectField } from '~shared/ui/select-field';
import { getNavigateList } from '../../lib';


// eslint-disable-next-line consistent-return


export function NavigateButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const selectOptions = getNavigateList(RoleEnum.SuperAdmin);

  useEffect(() => {
    const isOption = selectOptions.find((option) => option.value === location.pathname);
    if (isOption !== undefined) {
      setValue(isOption.value);
    } else
      setValue(selectOptions[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <SelectField
      value={value}
      onChange={(event) => setValue(event.target.value)}
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
