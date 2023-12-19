

import { useParams } from 'react-router-dom';
import { PatientsManagementForm } from '~entities/patients';
import { BackButton } from '~shared/ui/back-button';
import s from './styles.module.scss';

type Params = {
  patientId?: string
};

export function EmployeeManagement() {
  const params = useParams<Params>();

  return (
    <div className={s.root}>
      <BackButton title={params?.patientId ? 'Редактировать пациента' : 'Добавить пациента'} />
      <div className={s.formContainer}>
        <PatientsManagementForm
          patientId={params?.patientId ? params.patientId : undefined}
          isCreate={!params?.patientId} />
      </div>
    </div>
  );
}
