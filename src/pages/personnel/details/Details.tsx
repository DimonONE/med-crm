import { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sessionApi } from '~entities/session';
import { LoadImage } from '~features/patients';
import { errorHandler } from '~shared/lib/react-query';
import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { FileLoader } from '~shared/ui/file-loader';
import { Modal } from '~shared/ui/modal';
import s from './styles.module.scss';

type Params = {
  personnelId: string
};

export function PersonnelDetailsPage() {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const { data, error, isLoading } = sessionApi.useGetUserId(params.personnelId || '', { enabled: !!params.personnelId });
  const [isOpen, setOpen] = useState(false);

  const onSuccessModal = () => {
    setOpen(false);
    navigate(PATH_PAGE.personnel.root);
  };

  if (error) {
    toast(errorHandler(error), { type: 'error' });
    return <Navigate to={PATH_PAGE.personnel.root} />;
  }

  if (!data && !isLoading) {
    return <Navigate to={PATH_PAGE.personnel.root} />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className={s.root}>
      <BackButton title='Подробнее' link={PATH_PAGE.personnel.root} />
      <div className={s.container}>
        <div className={s.content}>
          <div >
            <LoadImage
              className={s.userImg}
              defaultImage={data.image}
            />

            <div className={s.info}>
              <div className={s.title}>Телефон</div>
              <div className={s.subTitle}>{data.phone}</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>ИНН</div>
              <div className={s.subTitle}>{data.tin}</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Страна</div>
              <div className={s.subTitle}>{data.country}</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Адрес</div>
              <div className={s.subTitle}>{data.address}</div>
            </div>
            {
              data.notice && (
                <div className={s.info}>
                  <div className={s.title}>Заметка</div>
                  <div className={classNames(s.subTitle, s.note)}>{data.notice}</div>
                </div>
              )
            }

          </div>
          <div >
            <div className={s.info}>
              <div className={s.title}>Должность</div>
              <div className={s.subTitle}>{data.role?.name}</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Имя</div>
              <div className={s.subTitle}>{data.fullName}</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Пол</div>
              <div className={s.subTitle}>{data.sex}</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Дата регистрации</div>
              <div className={s.subTitle}>{dayjs(data.createdAt).format('DD.MM.YYYY')}</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Кем выдан</div>
              <div className={s.subTitle}>{data.passportIssuingAuthority}</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Почта</div>
              <div className={s.subTitle}>{data.email}</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Город \ Поселок</div>
              <div className={s.subTitle}>{data.city}</div>
            </div>
          </div>

          <div className={s.loadFails}>
            <span className={s.title}>Прикрепленные документы</span>
            <FileLoader
              id="personnel-info-load-file"
              title='Загрузить'
              onDownload={() => false}
              hiddenButton
            />
          </div>
        </div>

        <Button
          className={classNames(s.submit, 'form-submit')}
          type="submit"
          color="secondary"
          onClick={() => navigate(PATH_PAGE.personnel.edit(data.id))}
        >
          Редактировать
        </Button>
        <Button
          className={classNames(s.delete, 'form-submit')}
          type="submit"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Удалить
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onSuccess={onSuccessModal}
        onClose={() => setOpen(false)}
        type="warn" >
        <div>
          Удалить фперсонал?
        </div>
      </Modal>
    </div>
  );
}
