
import { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { NavLink, useNavigate } from 'react-router-dom';
import { PatientAddServicesForm, usePatientId } from '~entities/patients';
import { useRoleUser } from '~entities/session';
import { LoadImage } from '~features/patients';
import { Api } from '~shared/api/realworld';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { FileLoader } from '~shared/ui/file-loader';
import s from './styles.module.scss';
import BackICO from './svg/back-ico.svg';
import EditICO from './svg/edit-ico.svg';
import EmailICO from './svg/email-ico.svg';
import PhoneICO from './svg/phone-ico.svg';

type PatientInfoProps = {
  patientId: string
  backButtonLink?: string
};

export function PatientInfo({ patientId, backButtonLink }: PatientInfoProps) {
  const navigate = useNavigate();
  const { checkUserRole } = useRoleUser();
  const [isOpen, setOpen] = useState(false);
  const [selectServices, setServices] = useState<Api.ServicePriceEntityDto[]>([]);
  const [price, setPrice] = useState<number>(0);

  const { data, isLoading } = usePatientId(patientId);

  const dateOfBirth = dayjs().diff(dayjs(data?.dateOfBirth), 'year');

  if ((!data && !isLoading) || !data) {
    return null;
  }

  return (
    <div className={classNames(s.root, 'container')}>
      <div className={s.navigateInfo}>
        <NavLink to={backButtonLink ?? PATH_PAGE.patients.records}>
          <BackICO />
        </NavLink>
        <span className={s.name}>{data.fullName}</span>
        {
          checkUserRole('medChief') && (
            <Button color='primary-reverse'>
              <EditICO />
            </Button>
          )
        }
      </div>

      <div className={classNames('d-flex', s.blockInfo)}>
        <div className={s.image}>
          <LoadImage className={s.userImage} defaultImage={data.image} />

          <Button
            className={classNames(s.button, s.buttonSuccess, s.buttonRecord)}
            onClick={() => navigate(PATH_PAGE.patients.editRecord(patientId))}
          >
            Записать
          </Button>
          <Button className={classNames(s.button, s.buttonCancel)} onClick={() => false}>
            Напоминание
          </Button>
        </div>

        <div className={s.userInfo}>
          <div className={s.textInfo}>
            <div className={s.icon}>
              <PhoneICO />
            </div>
            {data.phone}
          </div>
          <div className={s.textInfo}>
            <div className={s.icon}>
              <EmailICO />
            </div>
            {data.email}
          </div>
          <div className={s.textInfo}>{data.sex}</div>
          <div className={s.textInfo}>{
            dayjs(data.dateOfBirth).format('DD.MM.YYYY')} | {dateOfBirth} год(а)
          </div>
          <div className={s.textInfo}>Код клиента: {data.id}</div>
          <div className={classNames(s.textInfo, s.date)}>Рег. {dayjs(data.createdAt).format('DD.MM.YYYY')}</div>
        </div>

        <div className={s.userInfo}>
          <div className={s.textInfo}>{data.country}</div>
          <div className={s.textInfo}>{data.city}</div>
          <div className={s.textInfo}>{data.address}</div>
          <div className={classNames(s.textInfo, s.passportNumber)}>Номер паспорта: {data.passport}</div>
          <div className={s.textInfo}>{data.passportIssuingAuthority}</div>
        </div>

        <div>
          <div className={s.textBold}>Прикрепленные документы</div>
          <FileLoader
            id="patient-info-files"
            title='Загрузить'
            hiddenButton
          // filesData={data.files}
          />
        </div>

      </div>

      <div className={s.blockInfo}>
        <div className={s.recording}>
          <div className={classNames(s.textBold, s.textSuccess, 'd-flex')}>
            Запись:
            <EditICO />
          </div>
          <div className={s.contentInfo}>
            <div>{dayjs(data.user.createdBy).format('mm')} 14:30 четверг</div>
            <div>
              <span>Стоматолог:</span>
              <span className={s.textValue}>{data.user.fullName}</span>
            </div>
          </div>
        </div>

        <div className={s.recording}>
          <div className={classNames(s.textBold, 'd-flex')}>
            Услуги:
            <button type='button' onClick={() => setOpen(true)}>
              <EditICO />
            </button>
          </div>
          <div className={s.contentInfo}>
            {
              selectServices.map(({ id, name }) => (
                <div key={id} className={s.nameDisease}>{name}</div>
              ))
            }
          </div>
        </div>

        <div className={s.note}>
          <div className={s.textBold}>Жалоба:</div>

          <div className={s.contentInfo}>
            <div className={s.noteInfo}>Болят зубы, желтый налет, смешение швардевита.</div>
          </div>
        </div>

        <div className='d-flex'>
          <Button className={classNames(s.button, s.buttonSuccess)} onClick={() => false}>
            В оплату
          </Button>

          <Button className={classNames(s.button, s.buttonAttendance)} onClick={() => false}>
            Неявка
          </Button>

          <Button className={classNames(s.button, s.buttonCancel)} onClick={() => false}>
            Отмена
          </Button>

          <span className={s.priceAll}>₽ {price}  </span>
        </div>
      </div>
      <div className={s.blockInfo}>
        <div >
          <span>Всего посещений:</span>
          <span className={s.textValue}>9</span>
        </div>
        <div>
          <span>Выручка по клиенту:</span>
          <span className={s.textValue}>$ 22 445</span>
        </div>
        <div>
          <span>Неявки:</span>
          <span className={s.textValue}>1</span>
        </div>
        <div>
          <span>Отмены:</span>
          <span className={s.textValue}>2</span>
        </div>
      </div>


      <NavLink to={PATH_PAGE.receptionTable.root} className={s.tableInfo}>
        Таблица приема
      </NavLink>
      <NavLink to={PATH_PAGE.medInfo.root} className={s.tableInfo}>
        Медицинская информация
      </NavLink>
      <div className={s.tableInfo}>
        История платажей
      </div>
      <NavLink to={PATH_PAGE.patients.files('shared')} className={s.tableInfo}>
        Файлы
      </NavLink>

      <PatientAddServicesForm
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onSuccess={({ services, price: priceServices }) => {
          setServices(services);
          setPrice(priceServices);
        }}
      />
    </div>
  );
}
