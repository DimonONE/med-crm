
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { RoleEnum } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import s from './styles.module.scss';
import BackICO from './svg/back-ico.svg';
import EditICO from './svg/edit-ico.svg';
import EmailICO from './svg/email-ico.svg';
import PhoneICO from './svg/phone-ico.svg';

export function UserInfo() {

  return (
    <div className={classNames(s.root, 'container')}>
      <div className={s.navigateInfo}>
        <NavLink to=''>
          <BackICO />
        </NavLink>
        <span className={s.name}>Ганс Христиан Андерсон</span>
        {
          RoleEnum.MedChief && (
            <Button color='primary-reverse'>
              <EditICO />
            </Button>
          )
        }

      </div>

      <div className={classNames('d-flex', s.blockInfo)}>
        <div className={s.image}>
          <img src="" alt="user" />

          <Button className={classNames(s.button, s.buttonSuccess)} onClick={() => false}>
            Записать
          </Button>
        </div>

        <div className={s.userInfo}>
          <div className={s.textInfo}>
            <div className={s.icon}>
              <PhoneICO />
            </div>
            +38 (099) 254-34-55
          </div>
          <div className={s.textInfo}>
            <div className={s.icon}>
              <EmailICO />
            </div>
            ganshrist@gmail.com
          </div>
          <div className={s.textInfo}>Мужчина</div>
          <div className={s.textInfo}>05.07.1991    |   31 год</div>
          <div className={s.textInfo}>Код клиента: 87643543533423424</div>
          <div className={classNames(s.textInfo, s.date)}>Рег. 05.07.2023</div>
        </div>

        <div className={s.userInfo}>
          <div className={s.textInfo}>США</div>
          <div className={s.textInfo}>г.Вашингтон</div>
          <div className={s.textInfo}>ул.Биллгейтская 65\5 кв. 8</div>
          <div className={classNames(s.textInfo, s.passportNumber)}>Номер паспорта: 87АB0325</div>
          <div className={s.textInfo}>Ньюйорским ГУМВД Нововашингтонского района</div>
        </div>

        <div>
          <div className={s.textBold}>Прикрепленные документы</div>
        </div>

      </div>

      <div className={s.blockInfo}>
        <div className={s.recording}>
          <div className={classNames(s.textBold, s.textSuccess, 'd-flex')}>
            Запись:
            <EditICO />
          </div>
          <div>14:30 четверг</div>
          <div>
            <span>Стоматолог:</span>
            <span className={s.textValue}>Игнатенко Нина Федоровна</span>
          </div>

          <div className={s.nameDisease}>Установка брекетов</div>
          <div className={s.nameDisease}>Косметическая чистка</div>
        </div>

        <div className={s.note}>
          <div className={s.textBold}>Жалоба:</div>
          <div className={s.noteInfo}>Болят зубы, желтый налет, смешение швардевита.</div>
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


      <div className={s.tableInfo}>
        Таблица приема
      </div>
      <div className={s.tableInfo}>
        Медицинская информация
      </div>
      <div className={s.tableInfo}>
        История платажей
      </div>
    </div>
  );
}
