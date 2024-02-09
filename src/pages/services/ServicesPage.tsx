
import { CreateServices, ServicesList } from '~entities/services';
import { BackButton } from '~shared/ui/back-button';
import s from './styles.module.scss';

export function ServicesPage() {

  return (
    <div className={s.root}>
      <BackButton title='Услуги' className={s.backButton} />

      <div className={s.container}>
        <CreateServices />
        <ServicesList />
      </div>
    </div>
  );
}
