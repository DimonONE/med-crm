// import { useQueryClient } from '@tanstack/react-query';
// import { Button } from '~shared/ui/button';
import { useEffect, useState } from 'react';
import { MenuItem } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { SelectField } from '~shared/ui/select-field';

// eslint-disable-next-line consistent-return
const getNavigateList = (role: string) => {
  switch (role) {
    case 'super-admin':
      return [
        { value: PATH_PAGE.allClinic, label: 'Все клиники' },
        { value: PATH_PAGE.clinicApplications, label: 'Заявки' },
      ];

    default:
      return [];
  }
};

export function NavigateButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  // const queryClient = useQueryClient();

  // const handleClick = () => logout(queryClient);
  const selectOptions = getNavigateList('super-admin');

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
