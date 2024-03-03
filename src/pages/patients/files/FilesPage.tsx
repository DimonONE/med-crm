

import { useParams } from 'react-router-dom';
import { PatientsFilesForm } from '~entities/patients';
import { BackButton } from '~shared/ui/back-button';
import s from './styles.module.scss';

type Params = {
  status: 'shared' | 'move'
};

export function FilesPage() {
  const params = useParams<Params>();

  return (
    <div className={s.root}>
      <BackButton title="Файлы" />
      <div className={s.formContainer}>
        <PatientsFilesForm status={params.status!} />
      </div>
    </div>
  );
}
