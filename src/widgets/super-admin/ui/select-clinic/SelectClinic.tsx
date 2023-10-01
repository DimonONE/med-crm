import classNames from 'classnames';
import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import s from './styles.module.scss';

export function SelectClinic() {
  return (
    <div className={s.container}>
      <BackButton title='' link={PATH_PAGE.allClinic} />

      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Клиника Чайковского</div>
          <span className={s.subTitle}>Код клиники: 876</span>
        </div>
        <div className={s.column}>
          <div className={s.title}>Клиника Чайковского</div>
          <span className={s.subTitle}>Код клиники: 876</span>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Тип клиники</div>
          <span className={s.subTitle}>Стоматольгия</span>
        </div>
        <div className={s.column}>
          <div className={s.title}>Телефон</div>
          <span className={s.subTitle}>+7 095 518 58 36</span>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Главврач</div>
          <span className={s.subTitle}>Осипенко Владимир Николаевич</span>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Почта</div>
          <span className={s.subTitle}>dentalclinic.ru</span>
        </div>
        <div className={s.column}>
          <div className={s.title}>Оплачено до</div>
          <span className={s.subTitle}>dentalclinic.ru</span>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.title}>Адрес</div>
          <span className={s.subTitle}>ул.Пушкина 23\77</span>
        </div>
        <div className={s.column}>
          <div className={s.title}>Город</div>
          <span className={s.subTitle}>Сывтывкар</span>
        </div>
      </div>
      <div className={s.row}>
        <div >
          <div className={s.title}>Краткое описание</div>
          <span className={s.subTitle}>Lorem ipsum dolor sit amet consectetur. Quis augue risus habitasse magna cursus. Amet ornare sit non lobortis lacus ullamcorper. Malesuada a velit consequat non enim. Nibh velit aliquet mauris fringilla. Nisi massa tempor odio eu.</span>
        </div>
      </div>

      <Button color='secondary' className={s.editButton}>
        Редактировать
      </Button>

      <div className={classNames(s.row, s.buttonsRemove)}>
        <button type='button' className={s.remove}>Блокировать</button>
        <button type='button' className={s.remove}>Удалить клинику</button>
      </div>
    </div>
  );
}
