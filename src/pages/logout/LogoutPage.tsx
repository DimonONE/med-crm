import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '~features/session';
import { PATH_PAGE } from '~shared/lib/react-router';


export function LogoutPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    logout(queryClient);
    navigate(PATH_PAGE.login);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return null;
}
