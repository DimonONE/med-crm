
import { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useListOfServices } from '~entities/services';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import CloseICO from '~shared/svg/close-gray-ico.svg';
import { Button } from '~shared/ui/button';
import { MenuItemProps, SelectField } from '~shared/ui/select-field';
import { useUpdateRecord } from '../../api/patientsApi';
import s from './styles.module.scss';

type Success = {
  services: Api.ServicePriceEntityDto[],
};

type Props = {
  isOpen: boolean
  onSuccess: (data: Success) => void
  onClose: () => void
  record: Api.RecordEntityDto
};

export function PatientAddServicesForm(props: Props) {
  const { isOpen, record, onSuccess, onClose } = props;
  const [selectServices, setServices] = useState<Api.ServicePriceEntityDto[]>([]);
  const [selectOptions, setSelectOptions] = useState<MenuItemProps[]>([]);
  const { data } = useListOfServices();
  const { mutate } = useUpdateRecord();

  const priceServices = selectServices.reduce((acc, next) => acc + next.price, 0);

  const handleServices = (serviceId: number | string) => {
    const findService = data?.find(({ id }) => serviceId === id);
    const filterService = selectOptions.filter(({ value: id }) => serviceId !== id);

    if (findService) {
      setServices(prev => [...prev, findService]);
      setSelectOptions(filterService);
    }
  };

  const handleDelete = (serviceId: number) => {
    const newServices = selectServices.filter(({ id }) => serviceId !== id);
    const findService = data?.find(({ id }) => serviceId === id);
    setServices(newServices);

    if (findService)
      setSelectOptions(prev => ([...prev, { value: findService.id, label: findService.name }]));
  };

  const success = () => {
    const servicePrices = selectServices.map(({ name, price }) => ({
      price,
      name,
    }));

    const updateData = {
      'id': record.id,
      'userId': record.userId,
      'startTime': record.startTime,
      'endTime': record.endTime,
      'notice': record.notice ?? '',
      'servicePrices': servicePrices,
    };

    mutate(updateData, {
      onSuccess: () => {
        onSuccess({
          services: selectServices,
        });
        onClose();
      },

      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  useEffect(() => {
    const options = data
      ? [{ value: -1, label: 'Выберите услугу' }, ...data.map(({ id, name }) => ({ value: id, label: name }))]
      : [];

    setSelectOptions(options);

    setServices([]);
  }, [data, isOpen]);

  if (!isOpen || !selectOptions.length) {
    return null;
  }

  return (
    <div className={s.root}>
      <div className={s.modal}>
        <button type='button' className={s.modalCloseButton} onClick={onClose}>
          <CloseICO />
        </button>

        <div>
          <span className={s.title}>Добавить услуги</span>
          <SelectField
            value={-1}
            onChange={(event) => handleServices(event.target.value)}
            className={classNames('form-input', s.dropdown)}
            selectOptions={selectOptions}
          >
            {
              selectOptions.map(({ label, value: id }) => (
                <MenuItem
                  key={id}
                  value={id}
                >
                  {label}
                </MenuItem>
              ))
            }
          </SelectField>

          <div className={s.servicesList}>
            {
              selectServices.map(({ id, price, name }) => (
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
        </div>
        <div className={s.priceAll}>₽ {priceServices} <span className={s.priceText}>Вся сумма</span> </div>
        <div className={s.buttonsSubmit}>
          <Button color='secondary' className={s.button} onClick={onClose}>Отмена</Button>
          <Button className={s.button} onClick={success}>Применить</Button>
        </div>
      </div>
    </div >
  );
}
