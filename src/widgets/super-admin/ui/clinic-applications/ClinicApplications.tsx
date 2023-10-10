import { useNavigate } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { ItemContainer } from '~shared/ui/item-container';
import { TitleItem } from '~shared/ui/title-item';
import s from './styles.module.scss';

export function ClinicApplications() {
  const items = ['03.02.2021', '03.02.2021', '03.02.2021', '03.02.2021'];
  const navigaete = useNavigate();
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
          <Button className={s.buttonLink} color='secondary' onClick={() => navigaete(`${PATH_PAGE.superAdmin.clinicApplications}/1`)}>Подробнее</Button>
        </ItemContainer>
      ))}
    </div>
  );
}
