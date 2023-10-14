import classNames from 'classnames';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { FileLoader } from '~shared/ui/file-loader';
import s from './styles.module.scss';

export function PersonnelDetailsPage() {
  return (
    <div className={s.root}>
      <BackButton title='Подробнее' />

      <div className={s.loadFails}>
        <span className={s.title}>Прикрепленные документы</span>
        <FileLoader
          id="personnel-info-load-file"
          title='Загрузить'
          onDownload={() => false}
          hiddenButton
        />
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
  );
}
