import classNames from 'classnames';
import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { FileLoader } from '~shared/ui/file-loader';
import s from './styles.module.scss';

export function PersonnelDetailsPage() {
  return (
    <div className={s.root}>
      <BackButton title='Подробнее' link={PATH_PAGE.personnel.root} />
      <div className={s.container}>

        <div className={s.content}>
          <div >
            <img className={s.userImg} src="" alt="user" />

            <div className={s.info}>
              <div className={s.title}>Телефон</div>
              <div className={s.subTitle}>+380986981547</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>ИНН</div>
              <div className={s.subTitle}>6465498435486</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Страна</div>
              <div className={s.subTitle}>Мордор</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Адрес</div>
              <div className={s.subTitle}>Ул.Джона Маккейна 76\34</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Заметка</div>
              <div className={classNames(s.subTitle, s.note)}>Уважаемая медсестра в широких кругах</div>
            </div>
          </div>
          <div >
            <div className={s.info}>
              <div className={s.title}>Должность</div>
              <div className={s.subTitle}>Медсестра</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Имя</div>
              <div className={s.subTitle}>Елена Александровна Беркова</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Пол</div>
              <div className={s.subTitle}>Жен.</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Дата регистрации</div>
              <div className={s.subTitle}>05.05.2022</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Кем выдан</div>
              <div className={s.subTitle}>Ньюркским УМВС</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Почта</div>
              <div className={s.subTitle}>Elena776@gmail.com</div>
            </div>
            <div className={s.info}>
              <div className={s.title}>Город \ Поселок</div>
              <div className={s.subTitle}>Белгород</div>
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
        >
          Редактировать
        </Button>
        <Button
          className={classNames(s.delete, 'form-submit')}
          type="submit"
          color="primary"
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}
