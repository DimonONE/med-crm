import { Button } from '~shared/ui/button';
import { ItemContainer } from '~shared/ui/item-container';
import { TitleItem } from '~shared/ui/title-item';
import s from './styles.module.scss';

export function ClinicApplications() {
  const items = ['03.02.2021', '03.02.2021', '03.02.2021', '03.02.2021'];

  return (
    <div className={s.table}>
      <div className={s.header}>
        <TitleItem title="ДАТА ПОДАЧИ" onFilter={() => false} />
      </div>
      {items.map((date) => (
        <ItemContainer className={s.itemContainer}>
          <span>
            {date}
          </span>
          <Button className={s.buttonLink} color='secondary'>Подробнее</Button>
        </ItemContainer>
      ))}
    </div>
  );
}
