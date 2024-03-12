import { MedInfoDetail } from '~widgets/medical-informations';
import s from './styles.module.scss';


// type Params = {
//   patientId: string | undefined
// };

export function MedInfoDetailPage() {

  return (
    <div className={s.root}>
      <MedInfoDetail />
    </div>
  );
}
