import { AddClinicForm } from '~entities/super-admin';
import { BackButton } from '~shared/ui/back-button';
import s from './styles.module.scss';

export function AddClinics() {
  return (
    <div className={s.root}>
      <BackButton title='Добавить клинику' />
      <div className={s.formContainer}>
        <AddClinicForm />
      </div>

    </div>
  );
}
