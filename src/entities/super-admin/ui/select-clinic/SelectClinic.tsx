import { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Api } from '~shared/api/realworld';
import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import { Modal } from '~shared/ui/modal';
import { useSwitchStatusClinic } from '../../api/superAdminApi';
import s from './styles.module.scss';

type Props = {
  clinicId: number
};

export function SelectClinic({ clinicId }: Props) {
  const navigate = useNavigate();
  const { mutate } = useSwitchStatusClinic();

  const [isOpen, setOpen] = useState(false);
  const [, setPaidTo] = useState('');
  const [clinicData, setClinicData] = useState<Api.ClinicEntityDto | null>(null);

  const deleteClinic = () => {
    setOpen(false);
  };

  useEffect(() => {
    mutate({ id: clinicId }, {
      onSuccess: async (response) => {
        setClinicData(response);
        setPaidTo(response.endPaidDate);
      },
      onSettled: () => {
        // setSubmitting(false);
      },
      onError: () => {
        // toast('User not found!', { type: 'error' });
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicId]);

  if (!clinicData) {
    return null;
  }

  console.log('clinicData', clinicData);

  return (
    <div className={s.container}>
      <BackButton title='' link={PATH_PAGE.superAdmin.root} />

      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>{clinicData.name}</div>
          <span className={s.subTitle}>Код клиники: {clinicData.id}</span>
        </div>
        <div className={s.column}>
          <div className={s.title}>Дата регистрации</div>
          <span className={s.subTitle}>
            {dayjs(clinicData.createdAt).format('DD.MM.YYYY')}
          </span>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Тип клиники</div>
          <span className={s.subTitle}>{clinicData.type?.name}</span>
        </div>
        <div className={s.column}>
          <div className={s.title}>Телефон</div>
          <span className={s.subTitle}>{clinicData.phone}</span>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Главврач</div>
          <span className={s.subTitle}>{null}</span>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Почта</div>
          <span className={s.subTitle}>{null}</span>
        </div>
        <div className={s.column}>
          <div className={s.title}>Оплачено до</div>
          <span className={s.subTitle}>
            <DatePicker
              defaultValue={dayjs(clinicData.endPaidDate)}
              onChange={(event) => event && setPaidTo(event as string)}
            />
          </span>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Адрес</div>
          <span className={s.subTitle}>{clinicData.address}</span>
        </div>
        <div className={s.column}>
          <div className={s.title}>Город</div>
          <span className={s.subTitle}>{null}</span>
        </div>
      </div>
      <div className={s.row}>
        <div >
          <div className={s.title}>Краткое описание</div>
          <span className={s.subTitle}>{clinicData.description}</span>
        </div>
      </div>

      <Button
        color='secondary'
        className={s.editButton}
        onClick={() => navigate(PATH_PAGE.superAdmin.editClinic(clinicId.toString()))}
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
          <span className={s.modalNameClinic}>{clinicData.name}?</span>
        </div>
      </Modal>
    </div>
  );
}
