// import { useQueryClient } from '@tanstack/react-query';
// import { Button } from '~shared/ui/button';
import { useState } from 'react';
import { MenuItem } from '@material-ui/core';
// import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
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
  // const location = useLocation();
  const [value, setValue] = useState('');
  // const queryClient = useQueryClient();

  // const handleClick = () => logout(queryClient);
  const selectOptions = getNavigateList('super-admin');

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
          <MenuItem key={link} value={link} className='select-link'>
            <NavLink to={link} >{label}</NavLink>
          </MenuItem>
        ))
      }
    </SelectField>
  );
}
