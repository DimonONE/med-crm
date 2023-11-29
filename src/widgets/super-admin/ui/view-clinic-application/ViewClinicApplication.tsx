import { useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { superAdminApi } from '~entities/super-admin';
import { Api, HttpResponse } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { Modal } from '~shared/ui/modal';
import s from './styles.module.scss';

type Props = {
  clinicId: number
  clinicList: Api.UserEntityDto[] | undefined
};

type ModalState = {
  open: boolean,
  type: 'close' | 'success' | null,
};

export function ViewClinicApplication({ clinicId, clinicList }: Props) {
  const { mutate } = superAdminApi.useSwitchStatusUser();

  const [isOpen, setOpen] = useState<ModalState>({
    open: false,
    type: null,
  });
  const selectClinic = clinicList?.find(user => user.clinic?.id === clinicId);

  if (!selectClinic) {
    return null;
  }

  const onSuccess = (id: string, types: Pick<ModalState, 'type'>) => {
    mutate({ id, status: types.type === 'success' ? 'approval' : 'notapproval' }, {
      onSuccess: () => {
        setOpen({ open: true, type: types.type });
      },
      onError: (error) => {
        toast(errorHandler(error as HttpResponse<any, any>), { type: 'error' });
      },
    });
  };

  return (
    <div className={s.container}>
      <BackButton title='' link={PATH_PAGE.superAdmin.clinicApplications} />

      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>{selectClinic.clinic.name}</div>
          <span className={s.subTitle}>Код клиники: {selectClinic.clinic.id}</span>
        </div>
        <div className={s.column}>
          <div className={s.title}>Дата регистрации</div>
          <span className={s.subTitle}>
            {dayjs(selectClinic.createdAt).format('DD.MM.YYYY')}
          </span>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Тип клиники</div>
          <span className={s.subTitle}>{selectClinic.clinic.type?.name}</span>
        </div>
        <div className={s.column}>
          <div className={s.title}>Телефон</div>
          <span className={s.subTitle}>{selectClinic.phone}</span>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Главврач</div>
          <span className={s.subTitle}>{selectClinic.fullName}</span>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Почта</div>
          <span className={s.subTitle}>{selectClinic.email}</span>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Адрес</div>
          <span className={s.subTitle}>{selectClinic.clinic.address}</span>
        </div>
        <div className={s.column}>
          <div className={s.title}>Город</div>
          <span className={s.subTitle}>{null}</span>
        </div>
      </div>
      <div className={s.row}>
        {
          selectClinic.clinic.description && (
            <div >
              <div className={s.title}>Краткое описание</div>
              <span className={s.subTitle}>{selectClinic.clinic.description}</span>
            </div>
          )
        }
      </div>

      <div className={s.row}>
        <button
          type='button'
          className={s.remove}
          onClick={() => onSuccess(selectClinic.id, { type: 'close' })}
        >
          Отклонить
        </button>
        <Button className={s.editButton} onClick={() => onSuccess(selectClinic.id, { type: 'success' })}>
          Одобрить
        </Button>
      </div>

      <Modal
        isOpen={isOpen.open}
        onSuccess={() => setOpen({ open: false, type: null })}
        onClose={() => setOpen({ open: false, type: null })}
        type={isOpen.type === 'success' ? 'info' : 'warn-info'} >
        <div>
          {
            isOpen.type === 'success'
              ? 'Заявка одобрена!'
              : 'Заявка отклонена'
          }
        </div>
      </Modal>
    </div>
  );
}
