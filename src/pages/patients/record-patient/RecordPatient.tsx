

import { useParams } from 'react-router-dom';
import { PatientRecordForm } from '~entities/patients';
import { BackButton } from '~shared/ui/back-button';
import s from './styles.module.scss';

type Params = {
  patientId: string
};

export function RecordPatient() {
  const params = useParams<Params>();

  return (
    <div className={s.root}>
      <BackButton title="Записать пациента на прием" />
      <div className={s.formContainer}>
        <PatientRecordForm patientId={params.patientId!} />
      </div>
    </div>
  );
}
