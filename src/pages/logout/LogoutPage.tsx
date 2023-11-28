import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '~features/session';


export function LogoutPage() {
  const queryClient = useQueryClient();

  useEffect(() => {
    logout(queryClient);
  }, []);


  return null;
}
