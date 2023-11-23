import { useParams } from 'react-router-dom';
import { ClinicManagementForm } from '~entities/super-admin';
import { BackButton } from '~shared/ui/back-button';
import s from './styles.module.scss';

type Params = {
  clinicId?: string
};


export function ClinicManagement() {
  const params = useParams<Params>();

  return (
    <div className={s.root}>
      <BackButton title={params?.clinicId ? 'Редактировать клинику' : 'Добавить клинику'} />
      <div className={s.formContainer}>
        <ClinicManagementForm clinicId={params?.clinicId} />
      </div>
    </div>
  );
}
