import { Navigate, useParams } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { MedInfoDetail } from '~widgets/medical-informations';
import s from './styles.module.scss';

type Params = {
  id: string
  patientId: string
};
type IProps = {
  isUpdate: boolean
};

export function MedInfoDetailPage({ isUpdate }: IProps) {
  const { id, patientId } = useParams<Params>();

  if (!id || !patientId) {
    return <Navigate to={PATH_PAGE.patients.root} />;
  }

  return (
    <div className={s.root}>
      <MedInfoDetail id={id} patientId={patientId} isUpdate={isUpdate} />
    </div>
  );
}
