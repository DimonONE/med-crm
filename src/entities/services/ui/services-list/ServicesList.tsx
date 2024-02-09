
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { errorHandler } from '~shared/lib/react-query';
import CloseICO from '~shared/svg/close-gray-ico.svg';
import { Button } from '~shared/ui/button';
import { Spinner } from '~shared/ui/spinner';
import { useDeleteServices, useListOfServices } from '../../api/servicesApi';
import { deleteService, setService, useServicesState } from '../../model/servicesModel';
import s from './styles.module.scss';

export function ServicesList() {
  const services = useServicesState();
  const { data, isLoading } = useListOfServices();
  const { mutate } = useDeleteServices();

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: async () => {
        deleteService(id);
        toast('Success!', { type: 'success' });
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      setService(data);
    }
  }, [data]);

  return (
    <div className={s.root}>
      <div className={s.label}>Все услуги</div>

      {isLoading
        ? <Spinner />
        : (
          <div className={s.servicesList}>
            {
              services.map(({ id, price, name }) => (
                <div key={id} className={s.servicesItem}>
                  <span className={s.price}>₽ {price}</span>
                  <span className={s.info}>{name}</span>
                  <Button color='primary-reverse' onClick={() => handleDelete(id)}>
                    <CloseICO />
                  </Button>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
}
