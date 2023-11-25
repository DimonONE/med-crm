import { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Api } from '~shared/api/realworld';
import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import { Modal } from '~shared/ui/modal';
import { addClinicInfo } from '../../model/superAdminModel';
import s from './styles.module.scss';

type Props = {
  clinicId: number
  clinicList: Api.UserEntityDto[] | undefined
};

export function SelectClinic({ clinicId, clinicList }: Props) {
  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);
  const [, setPaidTo] = useState('');

  const selectClinic = clinicList?.find(user => user.clinic?.id === clinicId);

  if (!selectClinic) {
    return null;
  }

  const editClinic = () => {
    addClinicInfo(selectClinic);
    navigate(PATH_PAGE.superAdmin.editClinic(selectClinic.clinic.id));
  };

  const deleteClinic = () => {
    setOpen(false);
  };

  return (
    <div className={s.container}>
      <BackButton title='' link={PATH_PAGE.superAdmin.root} />

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
        <div className={s.column}>
          <div className={s.title}>Оплачено до</div>
          <span className={s.subTitle}>
            <DatePicker
              defaultValue={dayjs(selectClinic.clinic.endPaidDate)}
              onChange={(event) => event && setPaidTo(event as string)}
            />
          </span>
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

      <Button
        color='secondary'
        className={s.editButton}
        onClick={editClinic}
      >
        Редактировать
      </Button>

      <div className={classNames(s.row, s.buttonsRemove)}>
        <button type='button' className={s.remove}>Блокировать</button>
        <button
          type='button'
          className={s.remove}
          onClick={() => setOpen(true)}
        >
          Удалить клинику
        </button>
      </div>

      <Modal isOpen={isOpen} onSuccess={deleteClinic} onClose={() => setOpen(false)} type='warn' >
        <div>
          Вы уверены, что хотите удалить клинику <br />
          <span className={s.modalNameClinic}>{selectClinic.clinic.name}?</span>
        </div>
      </Modal>
    </div>
  );
}
