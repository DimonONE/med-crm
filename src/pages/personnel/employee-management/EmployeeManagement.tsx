
import { useParams } from 'react-router-dom';
import { PersonnelManagementForm } from '~entities/personnel';
import { BackButton } from '~shared/ui/back-button';
import s from './styles.module.scss';

type Params = {
  personnelId?: string
};

export function EmployeeManagement() {
  const params = useParams<Params>();

  return (
    <div className={s.root}>
      <BackButton title={params?.personnelId ? 'Редактировать персонал' : 'Добавить персонал'} />
      <div className={s.formContainer} >
        <PersonnelManagementForm
          personnelId={params?.personnelId ? params.personnelId : undefined}
          isCreate={!params?.personnelId} />
      </div>
    </div>
  );
}
